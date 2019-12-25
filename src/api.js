import fetch from 'isomorphic-unfetch';

const isProduction = process.env.NODE_ENV !== 'development';

const api = isProduction ? 'https://bet-man-app2.herokuapp.com/api' : process.env.BASE_API;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // 'Authorization': `Bearer ${localStorage.getItem('token')}`
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

const updateUser = (userId, values) => {
  return fetch(`${api}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(values)
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
  return fetch(`${api}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })
};

const newPassword = (values) => {
  return fetch(`${api}/auth/new-password`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers
  })
};

const forgotPassword = (values) => {
  return fetch(`${api}/auth/forgot-password`, {
    method: 'POST',
    body:  JSON.stringify(values),
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

const profileUpdate = (values) => {
  return fetch(`${api}/auth`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers
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
  updateUser,

  // Auth
  login,
  register,
  getProfile,
  forgotPassword,
  newPassword,
  profileUpdate
}
