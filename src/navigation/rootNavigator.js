// import React, { useState } from 'react';
// // import RootStackScreen from './RootStackScreen';
// // import {useAppSelector} from '../store/reducerHook';
// import {useDispatch, useSelector} from 'react-redux';
// // import {selectUserInfo, getDatafromAsync} from '../store/reducers/loginReducer';
// // import Storage from '../services/AsyncStorage';
// // import DrawerStack from './Drawer/DrawerStack';
// import AuthStorage from '../utils/authStorage';
// import AuthStack from './AuthStack/authStack';
// import Appstack from './AppStack/appStack';
// import { setUserData } from '../slices/userSlice';
 
// export const RootNavigator = () => {
//   const dispatch = useDispatch();
//   const [userDetails, setUserDetails] = React.useState({});
// //   const {userInfo} = useAppSelector(selectUserInfo);
// const userData = useSelector(state => state.user.userData);
//   const[userToken,SetUserToken]=useState("")
 
//   React.useEffect(() => {
//     const fetchData = async () => {
//       // const authtoken = await Storage.getObject('@auth_Token');
//     //   const user = await Storage.getObject('@user');
//       const accessToken = await AuthStorage.getAccessToken();
//       dispatch(setUserData({
//         // user: user,
//         authtoken: accessToken
//       }));
//     //   setUserDetails(user)
//       SetUserToken(accessToken)
//       // console.log(userDetails,"=======userDetails");
//     };
//     fetchData();

//   }, [userToken]);
 
 
//   // console.log(userInfo , "=======userInfo-----------", userDetails);

//   return (
//     <>
//        {userToken == null || userToken == '' ? ( 
    
//         <AuthStack />
//       ) : (
//         <Appstack />
//       )}
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../utils/authStorage';
import AuthStack from './AuthStack/authStack';
import Appstack from './AppStack/appStack';
import { setUserData } from '../slices/userSlice';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await AuthStorage.getAccessToken();
      
      if (accessToken) {
        dispatch(setUserData({ authtoken: accessToken }));
        setUserToken(accessToken);
      }
    };
    
    fetchData();
  }, []); // Run once when component mounts

  return (
    <>
      {userToken ? <Appstack /> : <AuthStack />}
    </>
  );
};
