import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// DỨT ĐIỂM: HashRouter KHÔNG cần basename cho GH Pages
const basename = '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename={basename}>
      <App />
    </HashRouter>
  </React.StrictMode>
)
