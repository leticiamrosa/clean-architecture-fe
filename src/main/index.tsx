import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routes/router'
import { makeLogin } from '@main/factories/pages/login/login-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
