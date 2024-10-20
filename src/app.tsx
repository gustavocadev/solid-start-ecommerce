// @refresh reload
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import Navbar from './components/shared/navbar';

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          {props.location.pathname !== '/login' && <Navbar />}
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
