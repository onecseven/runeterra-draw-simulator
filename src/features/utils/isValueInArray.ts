export let isValueInArray = <T>(array: T[], value: T): boolean => {
  if (array.indexOf(value) > -1) {
    return true;
  }
  return false;
};
