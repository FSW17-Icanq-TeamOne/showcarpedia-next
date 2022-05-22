import '../styles/globals.css';
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {store} from "../redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
    </Provider>
  )
}

export default MyApp
