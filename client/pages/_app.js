import "../styles/globals.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MainProvider } from "../context/mainContext";
import { SocketProvider } from "../context/socketContext";

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <SocketProvider>
        <Provider store={store}>
          <SSRProvider>
            <Component {...pageProps} />
          </SSRProvider>
        </Provider>
      </SocketProvider>
    </MainProvider>
  );
}

export default MyApp;
