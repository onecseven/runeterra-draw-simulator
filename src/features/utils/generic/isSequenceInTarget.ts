export let isSequenceInTarget = <Q>(sequence: Q[], target: Q[]): boolean => {
  //this is a bit clever
  //it only checks the first value of the sequence,
  //and when it matches it removes it from the array
  //at the end, if the sequence is present in the target array, checkingRefs will be empty
  //if it is present but not in the right order, or not present at all, checkingRefs will not be empty
  let checkingRefs = sequence.slice();
  target.forEach(card => {
    if (card === checkingRefs[0]) {
      checkingRefs.shift();
    }
  });
  if (checkingRefs.length === 0) {
    return true;
  }
  return false;
};
