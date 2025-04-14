import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './infrastructure/ui/portfolios/portfolio'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)
