export let insertAtRandom = <T>(value: T, array: T[]) => {
  let place = Math.floor(Math.random() * array.length);
  array.splice(place, 0, value);
  return array;
};
