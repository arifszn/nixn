import { RouterProvider } from 'react-router-dom';
import { browserRouter } from '@/routes/browserRouter.route';

function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />

    </>
  );
}

export default App;
