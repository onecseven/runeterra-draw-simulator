export let insertAtRandom = <T>(value: T, array: T[]) => {
  let place = Math.floor(Math.random() * array.length);
  let newArray = array.slice();
  newArray.splice(place, 0, value);
  return newArray;
};
