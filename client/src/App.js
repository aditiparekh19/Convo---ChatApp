import "./App.scss";
import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";
import AllRoutes from "./components/AllRoutes";

function App() {
  
  return (
    <Provider store={appStore}>
      <ApolloProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <AllRoutes />
          </Container>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
