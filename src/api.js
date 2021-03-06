import fetch from 'isomorphic-unfetch';

const api = process.env.BASE_API;

export const getHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }
};
// Bets endpoints

const createBet = (data) => {
  return fetch(`${api}/bets`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  })
};

const updateBet = (betId, data) => {
  return fetch(`${api}/bets/${betId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: getHeaders()
  })
};

const getBets = (token) => {
  return fetch(`${api}/bets`, {
    headers: getHeaders(token),
    method: 'GET'
  })
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
    body: JSON.stringify(values),
    headers: getHeaders()
  })
};


// Auth endpoints
const login = (creeds) => {
  return fetch(`${api}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(creeds),
    headers: getHeaders()
  })
};

const register = (data) => {
  return fetch(`${api}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  })
};

const newPassword = (values) => {
  return fetch(`${api}/auth/new-password`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: getHeaders()
  })
};

const forgotPassword = (values) => {
  return fetch(`${api}/auth/forgot-password`, {
    method: 'POST',
    body:  JSON.stringify(values),
    headers: getHeaders()
  })
};

const getProfile = (token) => {
  console.log('token', token)
  return fetch(`${api}/auth`, {
    method: 'GET',
    headers: {
      ...getHeaders(),
      'Authorization': `Bearer ${token}`
    },
  })
};

const ping = (header) => {
  return fetch(`${api}/auth/token/ping`, {
    method: 'GET',
    headers: header
  })
};

const profileUpdate = (values) => {
  return fetch(`${api}/auth`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: getHeaders()
  })
};

// Sport types endpoints
const getSportTypes = (token) => {
  return fetch(`${api}/sport-types`, {
    method: 'GET',
    headers: getHeaders(token)
  })
};

// Subscriptions
const getSubscriptions = (token) => {
 return fetch(`${api}/subscription/subscriptions`, {
   method: 'GET',
   headers: getHeaders(token)
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
  profileUpdate,
  ping,

  // Sport types
  getSportTypes,

  // Subscriptions
  getSubscriptions,
}
