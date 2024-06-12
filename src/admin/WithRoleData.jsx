import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  OFFICER_PENGAJUAN_ENDPOINT,
  MANAGER_PENGAJUAN_ENDPOINT,
  FINANCE_PENGAJUAN_ENDPOINT,
  MANAGER_APPROVE_PENGAJUAN_ENDPOINT,
  MANAGER_REJECT_PENGAJUAN_ENDPOINT,
  FINANCE_APPROVE_PENGAJUAN_ENDPOINT,
  FINANCE_REJECT_PENGAJUAN_ENDPOINT,
  LOGOUT_ENDPOINT,
  MANAGER_HISTORY_ENDPOINT,
  FINANCE_HISTORY_ENDPOINT,
} from '../constants/apiEndpoints';

const handleTokenExpiration = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

const fetchData = async (user, setData, fetched) => {
  if (!user) {
    console.error('User is not defined');
    return;
  }

  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  let response;
  try {
    switch (user.role) {
      case 'officer':
        response = await axios.get(OFFICER_PENGAJUAN_ENDPOINT);
        break;
      case 'manager':
        response = await axios.get(MANAGER_PENGAJUAN_ENDPOINT);
        break;
      case 'finance':
        response = await axios.get(FINANCE_PENGAJUAN_ENDPOINT);
        break;
      default:
        return;
    }
    setData(response.data);
    if (!fetched.current) {
      toast.success(`Berhasil login dengan role: ${user.role}`);
      fetched.current = true;
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const fetchHistory = async (user, setHistory) => {
  if (!user) {
    console.error('User is not defined');
    return;
  }

  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  let response;
  try {
    switch (user.role) {
      case 'manager':
        response = await axios.get(MANAGER_HISTORY_ENDPOINT);
        break;
      case 'finance':
        response = await axios.get(FINANCE_HISTORY_ENDPOINT);
        break;
      default:
        return;
    }
    setHistory(response.data);
  } catch (error) {
    console.error('Failed to fetch history:', error);
  }
};

const withRoleData = (WrappedComponent) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [history, setHistory] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const fetched = useRef(false);

    useEffect(() => {
      if (user) {
        fetchData(user, setData, fetched);
        fetchHistory(user, setHistory);
      }
    }, [user]);

    const approvePengajuanAsManager = async (id) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(MANAGER_APPROVE_PENGAJUAN_ENDPOINT(id));
        toast.success('Pengajuan approved successfully');
      } catch (error) {
        toast.error('Failed to approve pengajuan');
      }
    };

    const approvePengajuanAsFinance = async (id, proofOfTransfer) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const formData = new FormData();
      formData.append('proof_of_transfer', proofOfTransfer);

      try {
        await axios.post(FINANCE_APPROVE_PENGAJUAN_ENDPOINT(id), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Pengajuan approved successfully');
      } catch (error) {
        toast.error('Failed to approve pengajuan');
      }
    };

    const rejectPengajuan = async (id, rejectionReason) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(MANAGER_REJECT_PENGAJUAN_ENDPOINT(id), { reason: rejectionReason });
        toast.success('Pengajuan rejected successfully');
      } catch (error) {
        toast.error('Failed to reject pengajuan');
      }
    };

    const rejectPengajuanAsFinance = async (id, rejectionReason) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(FINANCE_REJECT_PENGAJUAN_ENDPOINT(id), { reason: rejectionReason });
        toast.success('Pengajuan rejected successfully');
      } catch (error) {
        toast.error('Failed to reject pengajuan');
      }
    };

    const createPengajuan = async (pengajuan) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(OFFICER_PENGAJUAN_ENDPOINT, pengajuan);
        toast.success('Pengajuan created successfully');
      } catch (error) {
        toast.error('Failed to create pengajuan');
      }
    };

    const handleEdit = async (id, updatedData) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(`${OFFICER_PENGAJUAN_ENDPOINT}/${id}/update`, updatedData);
        toast.success('Pengajuan updated successfully');
      } catch (error) {
        toast.error('Failed to update pengajuan');
      }
    };

    const handleDelete = async (id) => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.post(`${OFFICER_PENGAJUAN_ENDPOINT}/${id}/delete`);
        toast.success('Pengajuan deleted successfully');
      } catch (error) {
        toast.error('Failed to delete pengajuan');
      }
    };

    const handleLogout = async () => {
      const token = localStorage.getItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['X-Logout'] = 'true';

      try {
        await axios.post(LOGOUT_ENDPOINT);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        toast.info('Logout successful');
      } catch (error) {
        console.error(`Failed to logout: ${error}`);
        toast.error(`Logout failed: ${error.response ? error.response.data.message : error.message}`);
      }
    };

    return (
      <>
        <ToastContainer />
        <WrappedComponent
          data={data}
          user={user}
          userRole={user.role}
          history={history}
          createPengajuan={createPengajuan}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          approvePengajuanAsManager={approvePengajuanAsManager}
          approvePengajuanAsFinance={approvePengajuanAsFinance}
          rejectPengajuanAsManager={rejectPengajuan}
          rejectPengajuanAsFinance={rejectPengajuanAsFinance}
          fetchData={fetchData}
          handleLogout={handleLogout}
          {...props}
        />
      </>
    );
  };
};

export default withRoleData;
