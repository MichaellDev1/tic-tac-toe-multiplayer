import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
const App = React.lazy(() => import('./App'))
import './index.css'
import { GameContext } from './context/GameContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <GameContext>
        <App />
      </GameContext>
    </Suspense>
  </React.StrictMode>
)
