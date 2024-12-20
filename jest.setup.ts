import '@testing-library/jest-dom';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.test',
});

jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env }),
}));
