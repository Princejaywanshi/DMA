import ImagePicker from 'react-native-image-crop-picker';

export async function openPhotos(options) {
  try {
    const response = await ImagePicker.openPicker({
      mediaType: 'photo',
      ...options,
    });
    let ext = '.jpg';
    if (response?.mime === 'image/png') {
      ext = '.png';
    }
    let filename = new Date().getTime() + ext;
    return {
      uri: response.path,
      type: response.mime,
      name: filename,
      base64: response?.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function openCamera(options) {
  try {
    const response = await ImagePicker.openCamera({
      mediaType: 'photo',
      useFrontCamera: true, // Open front camera
      cropping: true,
      ...options,
    });
    console.log("response.filesize",response)
    let ext = '.jpg';
    if (response?.mime === 'image/png') {
      ext = '.png';
    }
    let filename = new Date().getTime() + ext;
    return {
      uri: response.path,
      type: response.mime,
      name: filename,
      base64: response?.data,
    };
  } catch (error) {
    throw error;
  }
}
