import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            color: '#333',           // readable text
            background: 'rgba(255, 255, 255, 0.95)', // soft default background
          },
          success: {
            style: {
              background: 'rgba(72, 187, 120, 0.95)', // soft green
              color: '#fff',
            },
          },
          error: {
            style: {
              background: 'rgba(242, 92, 92, 0.95)', // soft red
              color: '#fff',
            },
          },
          duration: 3000, // auto-hide in 3s
        }}
      />
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
