import axios from 'axios';

export const api = (token: string) =>
  axios.create({
    headers: {
      Authorization: token,
    },
  });
