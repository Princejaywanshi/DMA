/**
 * Importing and exporting all utils here
 * In my opinion its just a cleaner way.
 * 
 * Example usage in your components:
 * 
 * import { Dimensions } from 'path/to/utils';
 * 
 * const styles = StyleSheet.create({
 *  container: {
 *      height: Dimensions.SCREEN_HEIGHT,
 *      width: Dimensions.SCREEN_WIDTH
 *  }
 * });
 */

// dimensions
import * as Dimensions from './dimensions';
import * as Shape from './shape';
import * as Scale from './scale';

// platform
import * as PlatformUtils from './platform';

const maskNumber = (number: number | string) => {
  const numberString = number.toString();
  const prefixLength = numberString.length - 4;
  return numberString.replace(/./g, (_, index) => index < prefixLength ? '*' : numberString[index]);
}

function getChangedProperties(obj1: any, obj2: any): { isDifferent: boolean, changes: string[] } {
  const changes: string[] = [];

  // Helper function for deep comparison
  const checkDifference = (a: any, b: any, path: string[] = []): void => {
    if (a === b) return; // Same reference or primitive values
    
    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
      changes.push(path.join('.'));
      return; // Different types or one is null
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      // If the number of keys differs, mark all keys as changed
      keysA.forEach(key => {
        if (!keysB.includes(key)) {
          changes.push([...path, key].join('.'));
        }
      });
      keysB.forEach(key => {
        if (!keysA.includes(key)) {
          changes.push([...path, key].join('.'));
        }
      });
    } else {
      for (const key of keysA) {
        if (!keysB.includes(key)) {
          changes.push([...path, key].join('.'));
        } else {
          // Recursively check nested properties
          checkDifference(a[key], b[key], [...path, key]);
        }
      }
    }
  };

  // Start the comparison from the root level
  checkDifference(obj1, obj2);

  // Return whether objects are different and the list of changed properties
  return {
    isDifferent: changes.length > 0,
    changes,
  };
}
export type ChangeStatus = {
  [key: string]: {
    newValue: any;
    updated: boolean;
  };
};

export function deepCompareObjects(
  obj1: any,
  obj2: any,
  path: string = ''
): ChangeStatus {
  const changes: ChangeStatus = {};

  // Helper function to check if a value is empty or blank
  const isEmptyOrBlank = (value: any) => 
    value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');

  function compare(val1: any, val2: any, currentPath: string) {
    if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
      // Compare nested objects
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      const allKeys = new Set([...keys1, ...keys2]);

      allKeys.forEach(key => {
        compare(val1[key], val2[key], currentPath ? `${currentPath}.${key}` : key);
      });
    } else {
      // Skip comparison if both values are empty or blank
      if (isEmptyOrBlank(val1) && isEmptyOrBlank(val2)) {
        return;
      }

      if (val1 !== val2) {
        // Include in changes if the new value is not empty or blank
        if (!isEmptyOrBlank(val2)) {
          changes[currentPath] = {
            newValue: val2,
            updated: true
          };
        }
      }
    }
  }

  compare(obj1, obj2, path);

  // Return only properties where `updated` is true
  return Object.fromEntries(
    Object.entries(changes).filter(([_, value]) => value.updated)
  );
}

type Primitive = string | number | null | undefined;
interface ObjectComparison {
  property: string;
  oldValue: Primitive;
  newValue: Primitive;
};
export function compareObjects<T extends Record<string, Primitive>>(obj1: T, obj2: T): ObjectComparison[] {
  // Helper function to get all keys from both objects
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
  // List to store properties with updated values
  const updatedProperties: ObjectComparison[] = [];

  // Iterate through all unique keys
  allKeys.forEach(key => {
      const value1 = obj1[key as keyof T];
      const value2 = obj2[key as keyof T];

      // Check if values are different
      if (value1 !== value2) {
          // Add to list with property name and new value
          updatedProperties.push({
              property: key,
              oldValue: value1,
              newValue: value2
          });
      }
  });

  return updatedProperties;
}
 function generateUniqueId(): string {
  const randomBytes = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${randomBytes()}${randomBytes()}-${randomBytes()}-${randomBytes()}-${randomBytes()}-${randomBytes()}${randomBytes()}${randomBytes()}`;
}
export {
    Dimensions,
    Shape,
    Scale,
    PlatformUtils,
    maskNumber,
    getChangedProperties,
    generateUniqueId
};