import { Routes, Route } from "react-router";
import Header from "./components/CryptoDash/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
}

export default App
