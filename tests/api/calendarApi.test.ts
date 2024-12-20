import calendarApi from '../../src/api/calendarApi';

describe('Testing calendarApi', () => {
  test('should have the default configuration', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('should have the x-token variable in headers for all requests', async () => {
    const token = 'ABC-123-XYZ';
    localStorage.setItem('token', token);
    const res = await calendarApi.get('/auth');

    expect(res.config.headers['x-token']).toBe(token);
  });
});
