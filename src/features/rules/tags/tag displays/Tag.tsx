import React from 'react'
import {CardLookup} from "../../../utils/CardLookup"
//{"1":{"tag":{"type":"WITH","turn":1,"referents":["01SI015","01SI044"]},"hits":[]}}

export const Tag = (counter: Counter) => {
  let {referents, turn, type} = counter.tag
  let cards = referents.map((card) => CardLookup(card)).map(card => card.count = 1)
  switch (counter.tag.type) {
    case "WITH": {
      let str = `Counting every hand that both 
    }
  }
}