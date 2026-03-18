import "./ResultModal.css";
import type { PlantResult } from "../types/plant";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: PlantResult | null;
};

function ResultModal({ isOpen, onClose, result }: ResultModalProps) {
  if (!isOpen || !result) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Plant Identified</h2>
        <p>
          <strong>Common Name:</strong> {result.commonName}
        </p>
        <p>
          <strong>Scientific Name:</strong> {result.scientificName}
        </p>
        <p>
          <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
        </p>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ResultModal;