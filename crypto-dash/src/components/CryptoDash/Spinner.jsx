import {BarLoader} from "react-spinners";

const style = {
    display: "block",
    margin: "50px auto"
}

function Spinner({ color="blue", size="150" }) {
    return (
        <div>
            <BarLoader
                color={color}
                size={size}
                cssOverride={style}
                aria-label="Loading..."
            />
        </div>
    );
}

export default Spinner;
