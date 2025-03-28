import {ITEM_TYPES, USER} from './endpoints';

const env = {

  INPUT_TYPE_STRING: 'string',
  INPUT_TYPE_URL: 'url',
  INPUT_TYPE_EMAIL_ID: 'email_id',
  INPUT_TYPE_SINGLE_SELECT: 'single_select',
  INPUT_TYPE_DROPDOWN: 'dropdown',
  INPUT_TYPE_MULTI_SELECT: 'multi_select',
  INPUT_TYPE_MULTISELECT: 'multiselect',
  INPUT_TYPE_NUMBER: 'number',
  INPUT_TYPE_BOOLEAN: 'boolean',
  INPUT_TYPE_RADIO: 'radio',
  INPUT_TYPE_LONG_STRING: 'long_string',
  INPUT_TYPE_IMAGE_LIST: 'image_list',
  INPUT_TYPE_DECIMAL: 'decimal',
  INPUT_TYPE_DATE: 'date',


    //Fonts
    fontHeavy: 'SFProText-Heavy',
    fontRegular: 'SFProText-Regular',
    fontLight: 'SFProText-Light',
    fontMedium: 'SFProText-Medium',
    fontSemibold: 'SFProText-Semibold',
    fontBold: 'SFProText-Bold',

  //JOB_STATUS
  SHORTLISTED: {
    label: 'Shortlisted',
    value: 'SHORTLISTED',
  },
  INTERVIEWED: {
    label: 'Interviewed',
    value: 'INTERVIEWED',
  },
  SELECTED: {
    label: 'Selected',
    value: 'SELECTED',
  },
  REJECTED: {
    label: 'Rejected',
    value: 'REJECTED',
  },
  HIRED: {
    label: 'Hired',
    value: 'HIRED',
  },

 
  ALERT_TYPE_DEFAULT: 'DEFAULT',
  ALERT_TYPE_ERROR: 'ERROR',
  ALERT_TYPE_WARNING: 'WARNING',
  ALERT_TYPE_SUCCESS: 'SUCCESS',

 

  

  








  RETURN_REFUND: 'REFUND',
  LIST_TYPE_BRAND: 'LIST_TYPE_BRAND',

  LIST_VIEW_9: 'LIST_VIEW_9',

  DEFAULT_COLUMN_SIZE: 3,
  MIN_COLUMN_SIZE: 2,
  MAX_COLUMN_SIZE: 5,

  HEX_REGEX: /^#([0-9a-f]{3}){1,2}$/i,
  EXTENSION_REGEX: /(?:\.([^.]+))?$/,

  BACKGROUND_TYPE_ENUM: {
    BACKGROUND_IMAGE: 'BACKGROUND_IMAGE',
    BACKGROUND_COLOR: 'BACKGROUND_COLOR',
    TWO_DIMENSIONAL_GRADIENT: 'GRADIENT_2D',
    BLANK: 'BLANK_TRANSPARENT',
  },

  DEFAULT_GRADIENT_ANGLE: 0,

  SHAPE_ENUM: {SQUARE: 'SQUARE', CIRCLE: 'CIRCLE'},

  DEOGHARH_CITY_ID: 2,
  VIDEO_EXT: 'mp4',

  CANCELLED_BY_USER: 'CANCELLED_BY_USER',
  ORDER_RETURN: 'ORDER_RETURN',
  ORDER_RETURN_REASON: 'ORDER_RETURN_REASON',
  OPERATOR_ENUMS: {
    EQUAL_TO: 'EQUAL_TO',
    GREATER_THAN: 'GREATER_THAN',
    LESS_THAN: 'LESS_THAN',
    GREATER_THAN_OR_EQUAL_TO: 'GREATER_THAN_OR_EQUAL_TO',
    LESS_THAN_OR_EQUAL_TO: 'LESS_THAN_OR_EQUAL_TO',
  },

  TRANSACTION_TYPE_DEBIT: 'DEBIT',

  MILLISECONDS_TO_SECONDS_MULTIPLIER: 1000,
};

export default env;
