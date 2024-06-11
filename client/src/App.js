import "./App.scss";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <ApolloProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route path="/register" Component={Register} />
              <Route path="/login" Component={Login} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
