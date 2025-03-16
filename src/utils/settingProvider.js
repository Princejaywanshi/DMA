import React, {useEffect} from 'react';
import axios from 'axios';

const SettingsProvider = props => {
  useEffect(() => {
    initInterceptors();
  }, []);

  const initInterceptors = () => {
    axios.interceptors.response.use(
      async response => {
        console.log('🚀 ~ initInterceptors ~ response:', response);
        // if (response && response.status === 401) {
        //   const accessToken = await AuthStorage.getAccessToken();
        //   if (accessToken) {
        //     const refreshToken = await AuthStorage.getRefreshToken();
        //     if (accessToken && refreshToken) {
        //          await dispatch(
        //          getNewToken(),
        //         );
        //     } else {
        //       await onSessionExpired(response?.data?.error);
        //     }
        //   } else {
        //     await onSessionExpired(response?.data?.error);
        //   }
        // onSessionExpired(response?.data?.error || 'Unauthorized');
        // } else {
        // }
        return response;
      },
      async error => {
        console.log('🚀 ~ initInterceptors ~ error:', error);
        // if (error?.response && error?.response?.status === 401) {
        //   const accessToken = await AuthStorage.getAccessToken();
        //   if (accessToken) {
        //     const refreshToken = await AuthStorage.getRefreshToken();
        //     if (accessToken && refreshToken) {
        //        await dispatch(
        //          getNewToken(),
        //        );
        //     } else {
        //       await onSessionExpired(error?.data?.error);
        //     }
        //   } else {
        //     await onSessionExpired(error?.data?.error);
        //   }
        //    onSessionExpired(response?.data?.error || 'Unauthorized');
        //    } else {
        // }
        return error;
      },
    );
  };

  return <>{props.children}</>;
};

export default SettingsProvider;
