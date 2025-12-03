import { Component } from "react";

class LifecycleLoggerClass extends Component {

    constructor(props) {
        super(props);
        console.log("Component init...")
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        console.log("Component mounted...");
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            console.log("Component updated...", this.state.count);
        }
    }

    componentWillUnmount() {
        console.log("Component unmount...");
    }

    // classic function definition creates a different this reference
    incrementCount = () => {
        this.setState((current) => ({
            ...current,
            count: current.count + 1
        }));
    }

    render() {
        return (
            <div className="logger-container">
                <h2>LifecycleLogger (Class Component)</h2>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount} className="secondary-btn">Update</button>
            </div>
        );
    }
}

export default LifecycleLoggerClass;
