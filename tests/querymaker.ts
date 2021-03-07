import { Mulliganer } from '../Mulliganer'
import { checkArrays } from "../utils/array-equality"

let makeCard = () => Math.floor(Math.random() * 10)
let handMaker = () => {
  return [makeCard(), makeCard(), makeCard(), makeCard()]
}
let queryMaker = (card, priority, action, condition, predicate, referenceCards) => {
  return {
    card,
    priority,
    onHit: {
      action,
      condition,
      predicate,
      referenceCards
    }
  }
}
let testQueryMaker = (): MulliganQuery => {
  let card = [Math.floor(Math.random() * 10)]
  let action = Math.floor(Math.random() * 2) ? "KEEP" : "THROW"
  let predicate = Math.floor(Math.random() * 2) ? "PRESENCE" : "ABSENCE"
  let condition = Math.floor(Math.random() * 2) ? "ALWAYS" : "ONLY" //add UNLESS later
  // let action = "KEEP"
  // let predicate = "PRESENCE"
  // let condition = "ONLY"
  let priority = 1
  let referenceCards = [Math.floor(Math.random() * 10)]
  return queryMaker(card, priority, action, condition, predicate, referenceCards)
}

let makeTest = (rounds: number) => {
  let history = []
  let fakeMullFunc = (keep, sendBack) => {
    return {
      keep,
      sendBack
    }
  }
  for (let current = 0; current < rounds; current++) {
    let currentQuery = {
      preMull: handMaker(),
      query: testQueryMaker(),
      postMull: {
      }
    }
    currentQuery.postMull = Mulliganer([currentQuery.query], currentQuery.preMull, fakeMullFunc)
    history.push(currentQuery)
  }
  console.log(JSON.stringify(history, null, 1))
}

let testChecker = (expectedKeep: number[], expectedSendBack: number[]) => {
  let fakeMullFunc = (keep: number[], sendBack: number[]) => {
    let sortedExpectedKeep = expectedKeep.sort()
    let sortedResultKeep = keep.sort()
    let sortedExpectedSendBack = expectedSendBack.sort()
    let sortedResultSendBack = sendBack.sort()
    console.log(`
    EXPECTED: ${expectedKeep}, ${expectedSendBack}
    ACTUAL: ${keep}, ${sendBack}
    TEST PASSED: ${checkArrays(sortedExpectedKeep,sortedResultKeep) && checkArrays(sortedExpectedSendBack, sortedResultSendBack)}
    `)
    return checkArrays(sortedExpectedKeep,sortedResultKeep) && checkArrays(sortedExpectedSendBack, sortedResultSendBack)
  }
  return fakeMullFunc

}
let keepTests = [{
  query: [queryMaker([1], 1, "KEEP","ALWAYS", "PRESENCE", [0])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([1,2,3,4],[])
},{
  query: [queryMaker([1], 1, "KEEP","ONLY", "PRESENCE", [2])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([1,2,3,4],[])
},
{
  query: [queryMaker([1], 1, "KEEP","ONLY", "PRESENCE", [6])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([2,3,4],[1])
},
{
  query: [queryMaker([1], 1, "KEEP","ONLY", "ABSENCE", [2])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([2,3,4],[1])
},
{
  query: [queryMaker([1], 1, "KEEP","ONLY", "ABSENCE", [6])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([1,2,3,4],[])
},
{
  query: [queryMaker([1], 1, "KEEP","UNLESS", "ABSENCE", [2])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([1,2,3,4],[])
},
{
  query: [queryMaker([1], 1, "KEEP","UNLESS", "ABSENCE", [5])],
  preMull: [1,2,3,4],
  mullFunc: testChecker([2,3,4],[1])
}]

let throwTests = [
  {
    query: [queryMaker([1], 1, "THROW", "ALWAYS", "PRESENCE", [2])],
    preMull: [1, 2, 3, 4],
    mullFunc: testChecker([2, 3, 4], [2]),
  },
  {
    query: [queryMaker([1], 1, "THROW", "ONLY", "PRESENCE", [2])],
    preMull: [1, 3, 3, 4],
    mullFunc: testChecker([1, 3, 3, 4], []),
  },
  {
    query: [queryMaker([1], 1, "THROW", "ONLY", "PRESENCE", [3])],
    preMull: [1, 2, 3, 4],
    mullFunc: testChecker([ 2, 3, 4],[1]),
  },
  {
    query: [queryMaker([1], 1, "THROW", "ONLY", "ABSENCE", [2])],
    preMull: [1, 3, 3, 4],
    mullFunc: testChecker([3, 3, 4], [1]),
  },
  {
    query: [queryMaker([1], 1, "THROW", "ONLY", "ABSENCE", [2])],
    preMull: [1, 2, 3, 4],
    mullFunc: testChecker([1, 2, 3, 4], []),
  },
  {
    query: [queryMaker([1], 1, "THROW", "UNLESS", "ABSENCE", [2])],
    preMull: [1, 3, 3, 4],
    mullFunc: testChecker([3, 3, 4], [1]),
  },
  {
    query: [queryMaker([1], 1, "THROW", "UNLESS", "ABSENCE", [3])],
    preMull: [1, 2, 3, 4],
    mullFunc: testChecker([1,2, 3, 4],[])
  },
]

keepTests.forEach(({query, preMull, mullFunc}) => {
  // Mulliganer(query,preMull, mullFunc )
})


throwTests.forEach(({query, preMull, mullFunc}) => {
  // Mulliganer(query,preMull, mullFunc )
})
