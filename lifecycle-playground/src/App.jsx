import {useState} from 'react';
import LifecycleLogger from './components/LifecycleLogger.jsx';

function App() {
    const [showLogger, setShowLogger] = useState(false);

    return (
        <div className='container'>
            <h2>React Lifecycle Playground</h2>

            {/* Toggle LifecycleLoggerClass */}
            <button
                className='primary-btn'
                onClick={() => setShowLogger(!showLogger)}
            >
                {showLogger ? 'Unmount Logger' : 'Mount Logger'}
            </button>

            {showLogger && <LifecycleLogger />}
        </div>
    );
}

export default App;
