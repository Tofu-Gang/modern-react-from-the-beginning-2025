import Rating from "../Rating/Rating.jsx";

function App() {

    return (
        <Rating
            heading="How do you feel about React?"
            color="red"
            feedbackMessages={["Hate it", "Dislike it", "Meh", "Like it", "Love it"]}
        />
    );
}

export default App
