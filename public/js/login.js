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
