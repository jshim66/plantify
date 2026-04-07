import "./ResultModal.css";
import type { PlantResult } from "../types/plant";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: PlantResult | null;
  imageUrl: string;
};

function ResultModal({ isOpen, onClose, result, imageUrl }: ResultModalProps) {
  if (!isOpen || !result) return null;

  const isLowConfidence = result.confidence < 0.7;
  const confidenceLabel = isLowConfidence ? "Needs another look" : "Strong match";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <span className="modal-badge">Identification complete</span>
            <h2>Plant Identified</h2>
          </div>

          <button type="button" onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>

        <div className="modal-body">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded plant"
              className="modal-plant-image"
            />
          )}

          <div className="result-summary">
            <div className="result-row">
              <span className="result-label">Common Name</span>
              <strong>{result.commonName}</strong>
            </div>
            <div className="result-row">
              <span className="result-label">Scientific Name</span>
              <strong className="result-scientific">{result.scientificName}</strong>
            </div>
            <div className="result-row">
              <span className="result-label">Confidence</span>
              <strong>{(result.confidence * 100).toFixed(2)}%</strong>
            </div>
          </div>
        </div>

        <p className={isLowConfidence ? "confidence-pill low" : "confidence-pill"}>
          {confidenceLabel}
        </p>

        {isLowConfidence && (
          <div className="confidence-warning">
            This result may be uncertain. Try using a clearer photo with better
            lighting or a closer view of the plant.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultModal;
