'use strict';

import { Dimensions } from 'react-native';
import { isIOS } from './platform';

/**
 * device's height and width dimensions
 */
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = isIOS ? Dimensions.get('window').height : Dimensions.get('window').height;

const TOP_SPACE_ANDROID = {paddingTop:40}

/**
 * Add other dimension needs here
 */

export {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    TOP_SPACE_ANDROID
};