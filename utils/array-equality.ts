export const checkArrays = function (arr1, arr2){
  var nested = function(item){
    if (Array.isArray(item)){
      return true;
    }
    return false;
  }
  if (!Array.isArray(arr1) || !Array.isArray(arr2)){
    return false;
  }
  if (arr1.length !== arr2.length){
    return false;
  }
  if (arr1.every(nested) && arr2.every(nested)){ //nested case
    for (var q = 0; q < arr1.length; q++){
      if(!checkArrays(arr1[q], arr2[q])){ //recursion at one level of recursion
        return false;
      }
    }
  } else {  //not nested case
      for (var i = 0; i < arr1.length; i++){
        if (arr1[i] !== arr2[i]){
            return false;
          }
      }
  }
  return true;
}