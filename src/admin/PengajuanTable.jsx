import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/PengajuanTable.css'; 
import { FaEdit, FaTrash, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'; 

const PengajuanTable = ({ pengajuans, user, handleShowEdit, handleShowDelete, handleShowRejection, handleShowApproval }) => {
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const filteredPengajuans = pengajuans.filter(pengajuan => 
        pengajuan.item_name.toLowerCase().includes(filter.toLowerCase())
    );

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }

    const handleShowModal = (image) => {
        setCurrentImage(image);
        setShowModal(true);
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
            <div className="table-container"> {/* Add this div to make the table responsive */}
                <table className="pengajuan-table">
                    <thead>
                        <tr>
                            <th>Nama Pengaju</th>
                            <th>Nama Item</th>
                            <th>Jumlah</th>
                            <th>Harga Satuan</th>
                            <th>Status</th>
                            <th>Alasan Ditolak</th>
                            <th>Ditolak Oleh</th>
                            <th>Bukti Transfer</th>
                            <th>Harga Total</th>
                            <th>ID</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPengajuans.map((pengajuan) => (
                            <tr key={pengajuan.id}>
                                <td>{pengajuan.user.name}</td>
                                <td>{pengajuan.item_name}</td>
                                <td>{pengajuan.quantity}</td>
                                <td>{formatRupiah(pengajuan.price)}</td>
                                <td>{pengajuan.status}</td>
                                <td>
                                    {pengajuan.status === 'approved_finance' ? "Selamat, pengajuanmu sudah di approve oleh manager dan finance" :
                                    pengajuan.rejection_reason ? pengajuan.rejection_reason : "Pengajuan masih di proses"}
                                </td>
                                <td>
  {pengajuan.status === 'approved_finance' ? "Pengajuan berhasil di approve" :
  pengajuan.rejected_by ? pengajuan.rejected_by : "Pengajuan masih di proses"}
</td>
                                <td>
                                    {pengajuan.status === 'pending' ? "Pengajuan masih di proses" : 
                                    pengajuan.status === 'rejected' ? "Pengajuan kamu di tolak" : 
                                    pengajuan.status === 'approved_manager' ? "Pengajuan sedang di proses oleh tim finance" : 
                                    pengajuan.proof_of_transfer ? (
                                        <Button onClick={() => handleShowModal(pengajuan.proof_of_transfer)}>Lihat Bukti Transfer</Button>
                                    ) : null}
                                </td>
                                <td>{formatRupiah(pengajuan.total_price)}</td>
                                <td>{pengajuan.id}</td>
                                <td>
                                    {user.role === 'officer' && pengajuan.status === 'pending' ? (
                                        <>
                                            <Button variant="success" onClick={() => handleShowEdit(pengajuan)}><FaEdit /></Button>
                                            <Button variant="danger" onClick={() => handleShowDelete(pengajuan)}><FaTrash /></Button>
                                        </>
                                    ) : user.role === 'officer' ? (
                                        <p>Data sudah di proses oleh manager, kamu tidak bisa mengedit lagi :)</p>
                                    ) : (
                                        <>
                                            <Button variant="danger" onClick={() => handleShowRejection(pengajuan)}><FaThumbsDown /></Button>
                                            <Button variant="success" onClick={() => handleShowApproval(pengajuan)}><FaThumbsUp /></Button>
                                        </>
                                    )}
                                </td>
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
                    <img src={currentImage} alt="Proof of Transfer" style={{ width: '100%' }} />
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

export default PengajuanTable;
