export let isValueInArray = <T>(array: T[], value: unknown): value is T => {
  if (array.indexOf(value as T) > -1) {
    return true;
  }
  return false;
};
