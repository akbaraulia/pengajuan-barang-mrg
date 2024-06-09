import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RejectionModal = ({ show, handleClose, handleReject }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  const handleRejection = () => {
    if (!rejectionReason.trim()) {
      setError("Rejection reason is required");
    } else {
      setError("");
      handleReject(rejectionReason); 
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Rejection Reason</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="rejectionReason" className="form-label">
              Rejection Reason
            </label>
           <input
  type="text"
  className="form-control"
  id="rejectionReason"
  placeholder="Enter rejection reason"
  onChange={(e) => setRejectionReason(e.target.value)}
  onBlur={handleRejection}
/>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleRejection}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectionModal;
