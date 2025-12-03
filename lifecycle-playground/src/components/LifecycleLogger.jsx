import { useState, useEffect } from "react";

function LifecycleLogger() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("Component mounted...");
        return () => console.log("Component unmount...");
    }, []);
    useEffect(() => console.log("Component updated...", count), [count])

    function incrementCount() {
        setCount((current) => current + 1);
    }

    return (
        <div className="logger-container">
            <h2>LifecycleLogger (Function Component)</h2>
            <p>Count: {count}</p>
            <button onClick={incrementCount} className="secondary-btn">Update</button>
        </div>
    );
}

export default LifecycleLogger;
