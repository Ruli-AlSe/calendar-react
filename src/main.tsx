import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { CalendarApp } from './CalendarApp.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </StrictMode>
);
