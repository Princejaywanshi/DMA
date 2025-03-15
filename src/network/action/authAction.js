import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../constants';
// import {dispatchUserData} from '../../redux-store/actions';
// import {
//   flashMessage,
//   getDataFromLocalStorage,
//   setDataInLocalStorage,
// } from '../../utils/commonActions';
import Api from '../Api';
import { resetNavigation } from '../../navigation/rootNavigation,';

// export function setLoginUser(data) {
//   return async dispatch => {
//     dispatch(dispatchUserData(data));
//     Api.defaultHeader({
//       Authorization: 'Bearer ' + data.jwttoken,
//     });
//   };
// }


// export function getNewToken(oldToken, refreshToken) {
//   return async dispatch => {
//     try {
//       const res = await Api.GET(
//         `${USER.REFRESH_TOKEN}?oldToken=${oldToken}&referenceToken=${refreshToken}`,
//       );
//       await AsyncStorage.removeItem('@auth');
//       if (!res || !res?.data || res?.data?.error || res?.data?.errorCode) {
//         throw new Error(
//           res?.data?.message || res?.data?.error || 'Something went wrong!',
//         );
//       }
//       if (res?.status === 200) {
//         dispatch(setLoginUser(res?.data));
//         setDataInLocalStorage('@auth', JSON.stringify(res?.data));
//         return {status: true, data: res?.data};
//       }
//       await onSessionExpired('Unauthorized');
//     } catch (error) {
//       await onSessionExpired(error);
//     }
//   };
// }



export const onSessionExpired = async error => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  let filteredAsyncStorage = asyncStorageKeys;
  if (filteredAsyncStorage?.length > 0) {
    await AsyncStorage.multiRemove(filteredAsyncStorage);
  }
//   flashMessage('Error', 'Session Expired!', 'danger');
  resetNavigation('login');
  return Promise.reject(error);
};


