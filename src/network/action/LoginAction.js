
import { USER } from '../../constants';
import Api from '../Api';


export async function login(params) {
  try {
    const res = await Api.POST(USER.LOGIN, params);
    if (!res || !res?.data || res?.data?.error || res?.data?.errorCode) {
      throw new Error(
        res?.data?.message || res?.data?.error || 'Something went wrong1!',
      );
    }
    if (res.status === 200) {
      return res?.data;
    }
    throw new Error(res?.data?.message ?? 'Something went wrong!');
  } catch (error) {
    console.log('attendenceList', error);
    throw new Error(error?.message || error || 'Opps! Something went wrong!');
  }
}

export async function personalInfo(params) {
  try {
    const res = await Api.POST(USER.CORE_PERSONAL, params);
    console.log("ressss",res)
    if (!res || !res?.data || res?.data?.error || res?.data?.errorCode) {
      throw new Error(
        res?.data?.message || res?.data?.error || 'Something went wrong1!',
      );
    }
    if (res.status === 200) {
      return res?.data;
    }
    throw new Error(res?.data?.message ?? 'Something went wrong!');
  } catch (error) {
    console.log('attendenceList', error);
    throw new Error(error?.message || error || 'Opps! Something went wrong!');
  }
}