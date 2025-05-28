import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {store} from './redux/store.ts'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
)
