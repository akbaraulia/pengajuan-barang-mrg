import React, { useState } from 'react';
import withRoleData from './WithRoleData';
import withAuthentication from './WithAuthentication';
import { SECONDARY_COLOR } from '../constants/colors';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RejectionModal from './RejectionModal';
import DeleteModal from './DeleteModal';
import CreateModal from './CreateModal';
import ApprovalModal from './ApprovalModal';
import EditModal from './EditModal';
import PengajuanTable from './PengajuanTable';
import { FaUser } from 'react-icons/fa'; 

const Admin = ({
  data: pengajuans,
  approvePengajuanAsManager,
  approvePengajuanAsFinance,
  rejectPengajuanAsManager,
  rejectPengajuanAsFinance,
  createPengajuan,
  handleEdit,
  handleDelete,
  user,
  fetchData,
  handleLogout, 
}) => {
  const [selectedPengajuan, setSelectedPengajuan] = useState(null);
  const [proofOfTransfer, setProofOfTransfer] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [newPengajuan, setNewPengajuan] = useState({
    user_id: user.id,
    item_name: '',
    quantity: '',
    price: '',
    status: 'pending',
    rejection_reason: null,
    proof_of_transfer: null,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowRejection = (pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setShowRejectionModal(true);
  };

  const handleShowApproval = (pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setShowApprovalModal(true);
  };

  const handleShowEdit = (pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setNewPengajuan(pengajuan);
    setShowEditModal(true);
  };

  const handleShowDelete = (pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setShowDeleteModal(true);
  };

  const handleApprove = () => {
    if (user.role === 'manager') {
      approvePengajuanAsManager(selectedPengajuan.id);
    } else if (user.role === 'finance') {
      approvePengajuanAsFinance(selectedPengajuan.id, proofOfTransfer);
    }
    setShowApprovalModal(false);
  };

  const handleReject = async (rejectionReason) => {
    try {
      if (user.role === 'manager') {
        await rejectPengajuanAsManager(selectedPengajuan.id, { reason: rejectionReason });
      } else if (user.role === 'finance') {
        await rejectPengajuanAsFinance(selectedPengajuan.id, { reason: rejectionReason });
      }
      setShowRejectionModal(false);
      await fetchData();
    } catch (error) {
      console.error(`Failed to reject pengajuan: ${error.message}`);
    }
  };

  const handleCreate = async () => {
    if (
      newPengajuan.item_name === '' ||
      newPengajuan.quantity === '' ||
      newPengajuan.price === ''
    ) {
      toast.error('Please fill out all fields.');
    } else {
      try {
        await createPengajuan(newPengajuan);
        setShowCreateModal(false);
        await fetchData();
        toast.success('Pengajuan created successfully.');
      } catch (error) {
        toast.error(`Failed to create pengajuan: ${error.message}`);
      }
    }
  };

  const handleEditPengajuan = async () => {
    try {
      await handleEdit(selectedPengajuan.id, newPengajuan);
      setShowEditModal(false);
      await fetchData();
    } catch (error) {
      toast.error(`Failed to edit pengajuan: ${error.message}`);
    }
  };

  const handleDeletePengajuan = async () => {
    try {
      await handleDelete(selectedPengajuan.id);
      setShowDeleteModal(false);
      await fetchData();
    } catch (error) {
      toast.error(`Failed to delete pengajuan: ${error.message}`);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: SECONDARY_COLOR }}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img 
            src="https://merryriana.com/assets/images/mrg.png" 
            alt="Logo" 
            style={{ 
              width: '300px', 
              height: '100px', 
              filter: 'invert(1)' 
            }} 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
              <NavDropdown.Header style={{ maxWidth: '200px', whiteSpace: 'pre-wrap' }}>
                {`Halo ${user.name} !!! kamu login sebagai ${user.role}`}
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {(user.role === 'officer') ? (
  <Button variant="primary" onClick={() => setShowCreateModal(true)}>
    Create Pengajuan
  </Button>
) : ((user.role === 'finance' || user.role === 'manager') && (
  <Button variant="primary" onClick={() => window.location.href='/history'}>
    Lihat History
  </Button>
))}

      <PengajuanTable
        pengajuans={pengajuans}
        user={user}
        handleShowEdit={handleShowEdit}
        handleShowDelete={handleShowDelete}
        handleShowRejection={handleShowRejection}
        handleShowApproval={handleShowApproval}
      />

      <RejectionModal
        show={showRejectionModal}
        handleClose={() => setShowRejectionModal(false)}
        handleReject={handleReject}
      />
      
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeletePengajuan}
      />
      
      <CreateModal 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        newPengajuan={newPengajuan} 
        setNewPengajuan={setNewPengajuan} 
        handleCreate={handleCreate} 
      />

      <ApprovalModal 
        showApprovalModal={showApprovalModal} 
        setShowApprovalModal={setShowApprovalModal} 
        user={user} 
        setProofOfTransfer={setProofOfTransfer} 
        handleApprove={handleApprove} 
      />

      <EditModal 
        showEditModal={showEditModal} 
        setShowEditModal={setShowEditModal} 
        newPengajuan={newPengajuan} 
        setNewPengajuan={setNewPengajuan} 
        handleEditPengajuan={handleEditPengajuan} 
      />    
    </div>
  );
};

export default withAuthentication(withRoleData(Admin));