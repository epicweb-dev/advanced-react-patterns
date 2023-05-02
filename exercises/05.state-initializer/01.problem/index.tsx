import * as ReactDOM from 'react-dom/client'
import { App } from './app'

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
