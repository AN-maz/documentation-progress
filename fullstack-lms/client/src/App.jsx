import AppRouter from './routes/index.jsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      {/* Toast Notifikasi Global */}
      <Toaster position="top-right" />
      
      {/* AppRouter sudah berisi RouterProvider */}
      <AppRouter />
    </>
  );
}