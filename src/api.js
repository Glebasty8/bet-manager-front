import fetch from 'isomorphic-unfetch';

const api = `http://localhost:5000/api`;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
// Bets endpoints

const createBet = (data) => {
  return fetch(`${api}/bets`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })
};

const updateBet = (betId, data) => {
  return fetch(`${api}/bets/${betId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers
  })
};

const getBets = () => {
  return fetch(`${api}/bets`)
};

const getBet = (betId) => {
  return fetch(`${api}/bets/${betId}`)
};

const deleteBet = (betIt) => {
  return fetch(`${api}/bets/${betIt}`, {
    method: 'DELETE'
  })
};

// Users endpoints
const getUsers = () => {
  return fetch(`${api}/users`)
};

const deleteUser = (userId) => {
  return fetch(`${api}/users/${userId}`, {
    method: 'DELETE'
  })
};

// Auth endpoints
const login = (creeds) => {
  return fetch(`${api}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(creeds),
    headers
  })
};

const register = (data) => {
  console.log('data', data);
  return fetch(`${api}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })
};

const getProfile = (token) => {
  return fetch(`${api}/auth`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    },
  })
};

export default {
  // Bets
  getBets,
  getBet,
  createBet,
  deleteBet,
  updateBet,

  // Users
  getUsers,
  deleteUser,

  // Auth
  login,
  register,
  getProfile
}
