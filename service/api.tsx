import axios from 'axios';

const baseURL = 'http://192.168.0.5:3000';

const data = axios.get(`${baseURL}/cities`)
  .then((response) => response.data)

export default data;