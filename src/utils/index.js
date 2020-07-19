import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const axiosCall = async ({
    path, payload, method, contentType
  }) => {
    const url = `${process.env.REACT_APP_API_URL}${path}`;
    const headers = {
      'x-access-token': localStorage.token,
      'Content-Type': contentType || 'application/json',
    };
    const axiosdata = {
      method,
      url,
      data: payload,
      headers,
      json: true,
    };
  
    try {
      const result = await axios(axiosdata);
      const data = result && result.data;
      return data;
    } catch (error) {
      const { response } = error;
      // if(response.data.message === "Unauthorized")  {
      //   window.location.href = `/signin`;
      //   localStorage.clear()
      // }
      if (response.data.message) {
        return;
      }
      throw error;
    }
  };

  export const setErrors = (err) => {
    const errors = {
        message: err.response ? err.response.data : 'Server Connection Error',
        status: err.response ? err.response.status : '503',
    };
    return {
        type: 'GET_ERRORS',
        payload: errors,
    };
};