import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import AuthStorage from './authStorage';
import { onSessionExpired } from '../network/action/authAction';

const SettingsProvider = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.interceptors.response.use(
      async response => {
        console.log("res",response)
        if (response && response.status === 401) {
          console.log('401');
          const accessToken = await AuthStorage.getAccessToken();

          if (accessToken) {
            const refreshToken = await AuthStorage.getRefreshToken();
         
            if (accessToken && refreshToken) {
            //   await dispatch(
            //     getNewToken(),
            //   );
            } else {
              await onSessionExpired(response?.data?.error);
            }
          } else {
            await onSessionExpired(response?.data?.error);
          }
          // onSessionExpired(response?.data?.error || 'Unauthorized');
          // } else {
        }
        return response;
      },
      async error => {
        console.log("error",error)
        if (error?.response && error?.response?.status === 401) {
            console.log('401');
            const accessToken = await AuthStorage.getAccessToken();
  
            if (accessToken) {
              const refreshToken = await AuthStorage.getRefreshToken();
           
              if (accessToken && refreshToken) {
              //   await dispatch(
              //     getNewToken(),
              //   );
              } else {
                await onSessionExpired(response?.data?.error);
              }
            } else {
              await onSessionExpired(response?.data?.error);
            }
            // onSessionExpired(response?.data?.error || 'Unauthorized');
            // } else {
          }
        return error;
      },
    );
  }, []);

  return <>{props.children}</>;
};

export default SettingsProvider;
