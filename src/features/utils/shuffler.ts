/*
Deck Creator:
input: deck size (int)
output: a Deck Data Structure

the shuffle algorithm is from stack overflow lol

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i --) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
*/

export const shuffle = <A,>(unshuffled: A[]): A[] => {
  let deck = unshuffled.slice() 
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  return deck
}
