import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/index.css'
import App from '@/App.tsx'
import { persistStore } from 'redux-persist';
import { makeStore } from '@/store';

const store = makeStore();
const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* TODO: Add loader */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
