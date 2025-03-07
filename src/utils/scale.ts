'use strict';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from './dimensions';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.1) => size + (scale(size) - size) * factor;
const removeSpaces = (str:string) => {
    return str.replace(/\s/g, '');
  }
  const removePlusNinetyOne = (phoneNumber: string, startWith="+91"):string => {
    return phoneNumber.startsWith(startWith) ? phoneNumber.slice(3) : phoneNumber;
  }

 const removePrefixAndSpaces = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  const cleanedNumber = phoneNumber.replace(/[\s-()]+/g, '');
  // Define a list of common ISD codes
  const isdCodes = [
      '+1', // USA/Canada
      '+44', // UK
      '+91', // India
      '+33', // France
      '+49', // Germany
      '+61', // Australia
      '+81', // Japan
      '+86', // China
      '+55', // Brazil
      '+27', // South Africa
      '+971', // United Arab Emirates
       '0',
       '+',
      '+0'
  ];
  const isdCodeRegex = new RegExp(`^(${isdCodes.join('|').replace(/\+/g, '\\+')})`, 'i');
  const result = cleanedNumber.replace(isdCodeRegex, '');
  return result;
}
function toTitleCase(sentence:string) {
  return sentence
    .toLowerCase() // Ensure all characters are lowercase first
    .split(' ') // Split the sentence into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a sentence
}
export {
    scale,
    verticalScale,
    moderateScale,
    removeSpaces,
    removePlusNinetyOne,
    removePrefixAndSpaces,
    toTitleCase
};