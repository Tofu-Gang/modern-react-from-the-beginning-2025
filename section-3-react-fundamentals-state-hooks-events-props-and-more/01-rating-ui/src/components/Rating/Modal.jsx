function Modal({ message, info, closeModal }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{message}</h2>
                <p>{info}</p>
                <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
