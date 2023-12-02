import { Container, GlobalStyle } from "./GlobalStyles";
import DataForm from "./components/DataForm/DataForm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <DataForm />
      <Footer />
    </Container>
  );
}

export default App;
