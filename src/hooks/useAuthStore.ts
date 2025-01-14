import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  RootState,
  onCheckingAuth,
  onLogin,
  onLogout,
  clearErrorMessage,
  onLogoutCalendar,
} from '../store';
import calendarApi from '../api/calendarApi';

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);

  const startLogin = async (email: string, password: string) => {
    dispatch(onCheckingAuth());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Credenciales invalidas';
      dispatch(onLogout(message));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 200);
    }
  };

  const startRegister = async (name: string, email: string, password: string) => {
    dispatch(onCheckingAuth());

    try {
      const { data } = await calendarApi.post('/auth/new', { email, password, name });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Credenciales invalidas';
      dispatch(onLogout(message));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 200);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.error(JSON.stringify(error));
      localStorage.clear();

      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    // * Properties
    status,
    user,
    errorMessage,
    // * Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
