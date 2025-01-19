import { RouterProvider } from 'react-router-dom';
import { browserRouter } from '@/routes/browser-router.route';
import { Toaster } from '@/components/ui/sonner';
import 'unfonts.css';

function App() {
  return (
    <div className="font-sans antialiased">
      <RouterProvider router={browserRouter} />
      <Toaster />
    </div>
  );
}

export default App;
