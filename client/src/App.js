import "./App.scss";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route exact path="/" Componeleent={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
