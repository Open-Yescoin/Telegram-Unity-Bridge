import { StrictMode, Suspense } from 'react';
import App from './pages/App';
import { createRoot } from 'react-dom/client';

export default function render() {
  const container = document.querySelector('#root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </StrictMode>
    );
  }
}
