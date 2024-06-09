export const API_BASE_URL = 'http://localhost:8000/api'; 

export const REGISTER_ENDPOINT = `${API_BASE_URL}/register`;
export const FORGOT_PASSWORD_ENDPOINT = `${API_BASE_URL}/forgot-password`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
export const RESET_PASSWORD_ENDPOINT = `${API_BASE_URL}/reset-password`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/logout`;

export const OFFICER_PENGAJUAN_ENDPOINT = `${API_BASE_URL}/pengajuans`;

export const MANAGER_PENGAJUAN_ENDPOINT = `${API_BASE_URL}/manager/pengajuans`;
export const MANAGER_APPROVE_PENGAJUAN_ENDPOINT = id => `${MANAGER_PENGAJUAN_ENDPOINT}/${id}/approve`;
export const MANAGER_REJECT_PENGAJUAN_ENDPOINT = id => `${MANAGER_PENGAJUAN_ENDPOINT}/${id}/reject`;

export const FINANCE_PENGAJUAN_ENDPOINT = `${API_BASE_URL}/finance/pengajuans`;
export const FINANCE_APPROVE_PENGAJUAN_ENDPOINT = id => `${FINANCE_PENGAJUAN_ENDPOINT}/${id}/approve`;
export const FINANCE_REJECT_PENGAJUAN_ENDPOINT = id => `${FINANCE_PENGAJUAN_ENDPOINT}/${id}/reject`;