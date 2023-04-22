/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',

      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
      showAlert('success', 'Logged in successfully');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error.response.data);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.reload(true); //set true to load fresh page not from cache
  } catch (error) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
