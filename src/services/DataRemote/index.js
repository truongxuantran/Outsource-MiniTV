import axios from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Constants from '../../config/Constant';
import DataLocal from '../DataLocal';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

axios.interceptors.response.use(
  (response) => {
    checkResponse();
    return response;
  },
  (error) => {
    console.log(error);
    console.log(JSON.stringify(error));
  },
);

const checkResponse = () => {
  // EventRegister.emitEvent('TokenExpired');
};

const get = async (path, params) => {
  const data = await axios.get(path, params, axiosConfig);
  return data;
};

const generateAccessToken = async () => {
  const params = {};
  params.app_udid = 'a0f7ff34-900a-4a93-dffd';
  params.model = DeviceInfo.getModel();
  params.os_name = Platform.OS;
  params.os_ver = DeviceInfo.getSystemVersion();
  params.app_ver = Constants.VERSION_APP;
  return await axios.post('/auth/access-token', params, {
    headers: {
      'X-Access-Id': Constants.KEY_ACCESS_ID,
      'X-Secret-Key': Constants.KEY_SECRET,
      'Content-Type': 'application/json',
    },
  });
};

const signUp = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/registration', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

export default {
  generateAccessToken,
  signUp,
};
