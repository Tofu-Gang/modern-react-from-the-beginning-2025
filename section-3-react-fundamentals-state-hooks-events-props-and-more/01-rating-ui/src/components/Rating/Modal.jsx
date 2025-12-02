import Button from "./Button.jsx";

function Modal({ message, info, closeModal }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{message}</h2>
                <p>{info}</p>
                <Button className="close-btn" onClick={closeModal}>Close</Button>
            </div>
        </div>
    );
}

export default Modal;
