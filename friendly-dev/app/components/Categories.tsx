type CategoriesProps = {
    categories: string[],
    selectedCategory: string,
    setSelectedCategory: (category: string) => void,
    setCurrentPage: (page: number) => void
}

function Categories({ categories, selectedCategory, setSelectedCategory, setCurrentPage }:CategoriesProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded text-sm ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 cursor-pointer"}`}
                >{category}</button>
            ))}
        </div>
    );
}

export default Categories;
