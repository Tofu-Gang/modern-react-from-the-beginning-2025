import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";

function App() {
    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-6">🛒Product Catalog</h1>
                <ProductList/>
            </div>
            ;
        </>);

}

export default App
