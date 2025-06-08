import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Ticket API calls
export const getTickets = async (params = {}) => {
  const response = await api.get('/tickets', { params });
  return response.data;
};

export const getTicket = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await api.post('/tickets', ticketData);
  return response.data;
};

export const updateTicket = async (id, ticketData) => {
  const response = await api.put(`/tickets/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};