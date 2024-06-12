import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/HistoryTable.css';

const HistoryTable = ({ historyData = [] }) => {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const filteredHistory = historyData.filter(history => 
    history.item_name.toLowerCase().includes(filter.toLowerCase())
  );

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  }

  const handleShowModal = (image) => {
    setCurrentImage(image);
    setShowModal(true);
    setImageLoading(true); // Reset loading state
  }

  const handleCloseModal = () => {
    setCurrentImage(null);
    setShowModal(false);
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter by item name" 
        value={filter} 
        onChange={e => setFilter(e.target.value)} 
        className="search-bar"
      />
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Nama Pengaju</th>
              <th>Nama Item</th>
              <th>Jumlah</th>
              <th>Harga Satuan</th>
              <th>Status</th>
              <th>Approved By Manager</th>
              <th>Approved By Finance</th>
              <th>Bukti Transfer</th>
              <th>Harga Total</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((history) => (
              <tr key={history.id}>
                <td>{history.user.name}</td>
                <td>{history.item_name}</td>
                <td>{history.quantity}</td>
                <td>{formatRupiah(history.price)}</td>
                <td>{history.status}</td>
                <td>{history.approved_by_manager ? history.approved_by_manager.name : "N/A"}</td>
                <td>{history.approved_by_finance ? history.approved_by_finance.name : "N/A"}</td>
                <td>
                  {history.proof_of_transfer ? (
                    <Button onClick={() => handleShowModal(history.proof_of_transfer)}>Lihat Bukti Transfer</Button>
                  ) : "N/A"}
                </td>
                <td>{formatRupiah(history.total_price)}</td>
                <td>{history.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bukti Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageLoading && <div>Loading...</div>}
          {currentImage && (
            <img
              src={currentImage}
              alt="Proof of Transfer"
              style={{ width: '100%' }}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistoryTable;
