import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, } from 'react-router-dom'
import { ThemeProvider, } from 'react-jss'
import { Provider, } from 'react-redux'

import MessageProvider from '@/components/messageProvider/MessageProvider'
import App from './App'
import '@/assets/style/main.css'
import store from './redux/index'

export const theme = {
  yellow150: '#ffda44',
  smoothCubicBezier: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
}
export type ThemeGlobal = typeof theme

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MessageProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </MessageProvider>
)
