
function ResultModal({ isOpen, onClose, result }) {
    if (!isOpen || !result) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Plant Identified</h2>
                <p><strong>Common Name:</strong> {result.commonName}</p>
                <p><strong>Scientific Name:</strong> {result.scientificName}</p>
                <p><strong>Confidence:</strong> {result.confidence.toFixed(2)}%</p>
            </div>
        </div>
    );
}

export default ResultModal;