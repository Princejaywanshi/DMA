import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { GetAddressModule } from "../services/customNativemoduls";

export const getCurrentLocation = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        (position) => {
            const cords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            resolve(cords);
        },
        (error) => {
            reject(error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
});
// if (Platform.OS === 'android') {
//     requestLocationPermission();
//   }

export const handleGetAddress = async (latitude: number, longitude: number): Promise<{address: string, error?: any}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const address = await GetAddressModule.getAddressFromLocation(latitude, longitude) as string;
      resolve({address});
    } catch (error) {
      console.error("Error getting address:", error);
      reject({error: error});
    }
  });
};

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {

      const authorizationLevel = 'whenInUse'; // Or 'always' for background access
      const status = await Geolocation.requestAuthorization(authorizationLevel);
      return status === 'granted';
    
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      return (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted' ||
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === 'granted'
      );
    } else {
      console.warn('Location permission request not supported on this platform');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
export const locationPermission = () => {
	if (Platform.OS === 'android' && Platform.Version > 22) {
		return PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		);
	}
	return Promise.resolve('granted');
};


export const cameraPermission = async () => {
    return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
    );
};

// range in KM to check current lat long is within the KM or not!

export const calculateDistance = (range:number, latLogString:string, myCurrentLatLog:string):Promise<boolean> => {
   return new Promise((resolve, reject) => {
    // console.log('calculate distance started');
    //   range = user.GeoFencceDistance;
      const splittedStr = latLogString.split(',');
      // console.log('splitedStr: ' + splittedStr);

      const ouLat = parseFloat(splittedStr[0]);
      const ouLng = parseFloat(splittedStr[1]);

      const currentLat_Log = myCurrentLatLog.split(',');

      const lat = parseFloat(currentLat_Log[0]);
      const lng = parseFloat(currentLat_Log[1]);

      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat - ouLat);  // deg2rad below
      const dLon = deg2rad(lng - ouLng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(ouLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      
      const distanceInMeter = d/1000;
      const rangeInMeter = range/1000;
    //   this.distance = d;
      // console.log('distance: ' + d);
      if (parseFloat(distanceInMeter?.toFixed(3)) > parseFloat(rangeInMeter?.toFixed(3))) {
        reject(false);
      } else {
        // console.log('range in');
        resolve(true)
      }

    });
    
  }

const  deg2rad = (deg:number) => (deg * (Math.PI / 180));