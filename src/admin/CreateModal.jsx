import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CreateModal = ({ showCreateModal, setShowCreateModal, newPengajuan, setNewPengajuan, handleCreate }) => {
  return (
    <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Pengajuan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              value={newPengajuan.item_name}
              onChange={(e) =>
                setNewPengajuan({ ...newPengajuan, item_name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={newPengajuan.quantity}
              onChange={(e) =>
                setNewPengajuan({ ...newPengajuan, quantity: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={newPengajuan.price}
              onChange={(e) =>
                setNewPengajuan({ ...newPengajuan, price: e.target.value })
              }
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;