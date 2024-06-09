import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ApprovalModal = ({ showApprovalModal, setShowApprovalModal, user, setProofOfTransfer, handleApprove }) => {
  return (
    <Modal show={showApprovalModal} onHide={() => setShowApprovalModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{user.role === 'finance' ? 'Upload Proof of Transfer' : 'Approve Pengajuan'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user.role === 'finance' ? (
          <form>
            <div className="mb-3">
              <label htmlFor="proofOfTransfer" className="form-label">
                Proof of Transfer
              </label>
              <input
                type="file"
                className="form-control"
                id="proofOfTransfer"
                onChange={(e) => setProofOfTransfer(e.target.files[0])}
              />
            </div>
          </form>
        ) : (
          'Are you sure you want to approve this pengajuan?'
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
          Close
        </Button>
        <Button variant="success" onClick={handleApprove}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalModal;