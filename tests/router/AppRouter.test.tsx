import React from 'react';
import { render, screen } from '@testing-library/react';

import { AppRouter } from '../../src/router/AppRouter';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe('Testing AppRouter', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should render loading and call checkAuthToken', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText('Cargando...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('should render loading and call checkAuthToken', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/auth2/some-path']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should render calendar if user is authenticated', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});
