import {createRoot} from "react-dom/client"
import {StrictMode} from "react"
import {ProductProvider} from "./context/ProductContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import App from "./App.jsx"
import "./index.css"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ProductProvider>
            <CartProvider>
                <App/>
            </CartProvider>
        </ProductProvider>
    </StrictMode>,
);
