type PostFilterProps = {
    searchQuery: string,
    onSearchChange: (value: string) => void
}

function PostFilter({ searchQuery, onSearchChange }:PostFilterProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                value={searchQuery}
                placeholder="Search Posts..."
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default PostFilter;
