import {createContext} from 'react';

const globalsScope = {
    otp:'',
    IsLogin:false,
    phoneNumber:'',
    countyCode:''
};

export const AuthSplashContextType = createContext<typeof globalsScope>(
  {} as typeof globalsScope,
);



export interface SplashContextType {
  otp: string;
  IsLogin: boolean;
  IsOPTSent: boolean;
  ISSplashNextClicked: boolean;
  IsOPTVerified: boolean;
  phoneNumber: string;
  transactionId: string;
  countyCode: string;
  userToken: string;
  userData: {};
  companyData: companyData;
  dispatch: React.Dispatch<any>; // Add the dispatch property here
}
type companyData = {
  companyName:string,
  ownerName:string,
  workingEmploysNumber:string,
  IsCompanyNameAdded:boolean,
  workSchedule:{
    workingDays:string,
    startTime:string,
    closeTime:string,
    latePost:string,
    earlyExit:string
  },
}