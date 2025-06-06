import { Footer } from "./Components/Footer.tsx";
import { Header } from "./Components/Header.tsx";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./Screens/HomeScreen.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductScreen } from "./Screens/ProductScreen.tsx";

export const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};
