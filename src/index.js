import App from 'nicejs'
import routes from './routes'

// create app
const app = App()

// use routes
app.router(routes)

// start server
app.start('#root')
