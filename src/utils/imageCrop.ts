import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

interface CropImageOptions {
  width?: number;
  height?: number;
  cropping?: boolean; // Optional, defaults to true
  avoidEmptySpaceAroundImage?: boolean; // Optional, iOS only, defaults to true
  cropperActiveWidgetColor?: string; // Optional, Android only, defaults to "#424242"
  cropperStatusBarColor?: string; // Optional, Android only, defaults to "#424242"
  cropperToolbarColor?: string; // Optional, Android only, defaults to "#424242"
  cropperToolbarWidgetColor?: string; // Optional, Android only, defaults to darker orange
  freeStyleCropEnabled?: boolean; // Optional, defaults to false
}

const cropImageBase64 = async ( options?: CropImageOptions): Promise<string | null> => {
  try {
    
    const response = await ImagePicker.openPicker({
        width: options?.width,
        height: options?.height,
        cropping: options?.cropping ?? true, // Default to cropping
        mediaType: 'photo',
        includeBase64: true,
        includeExif: false, // Avoid including EXIF data (optional)
        compressImageQuality: 1, // Avoid compression (optional)
        ...options, // Spread additional options
      });

    //   console.log('response', response);
  
      if (!response.data) {
        return null; // User cancelled or encountered an error
      }
  
      return response.data; // Return the cropped image base64 string





    // const response = await ImagePicker.openPicker({
    //   width: options?.width,
    //   height: options?.height,
    //   cropping: options?.cropping ?? true, // Default to cropping
    //   mediaType: 'photo',
    //   includeBase64: true,
    //   includeExif: false, // Avoid including EXIF data (optional)
    //   compressImageQuality: 1, // Avoid compression (optional)
      
    //   ...options, // Spread additional options
    // });
    // Handle platform-specific logic for accessing the image file:
    let imageUri: string;
    // if (Platform.OS === 'ios') {
    //   imageUri = imagePath; // iOS can handle paths directly
    // } else {
    //   // For Android, use RNFS to get a content URI from the file path
    //   const fileStat = await RNFS.stat(imagePath);
    //   if (!fileStat.isFile()) {
    //     console.warn('Invalid image file path on Android');
    //     return null;
    //   }
    //   imageUri = await RNFS.uriFromFilePath(imagePath); // Get content URI from path
    // }

    // const response = await ImagePicker.openCropper({
    //   path: imagePath, // Use the platform-specific URI
    //   width: options?.width,
    //   mediaType: 'photo',
    //   height: options?.height,
    //   cropping: options?.cropping ?? true, // Default to cropping
    //   includeBase64: true,
    //   includeExif: false, // Avoid including EXIF data (optional)
    //   compressImageQuality: 0.7, // Avoid compression (optional)
    //   ...options, // Spread additional options
    // });

    // if (!response.data) {
    //   return null; // User cancelled or encountered an error
    // }

    // return response.data; // Return the cropped image base64 string
  } catch (error) {
    // console.error('Error cropping image:', error);
    return null;
  }
};

export default cropImageBase64;