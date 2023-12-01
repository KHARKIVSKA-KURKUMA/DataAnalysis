import { Container, GlobalStyle } from "./GlobalStyles";
import DataForm from "./components/DataForm/DataForm";
import Header from "./components/Header/Header";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <DataForm />
    </Container>
  );
}

export default App;
