import { Routes, Route } from "react-router";
import Header from "./components/CryptoDash/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CoinDetails from "./components/CryptoDash/CoinDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/coin/:id" element={<CoinDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App
