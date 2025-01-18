import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CocinaApp } from './CocinaApp.jsx'
import { Provider } from "react-redux"
import { store } from './store/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CocinaApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
