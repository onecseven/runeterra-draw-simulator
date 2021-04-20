import {KEYWORDS} from "../../store/constants"

export const isKeyword = (str: KEYWORD | string): str is KEYWORD => {
  for (let keyword of KEYWORDS){
    if (str == keyword) return true    
  }
  return false
}

export const isTagType = (str: TagType | string | number): str is TagType => {
  if (str === "GROUP" || str === "WITH" || str === "WITHOUT" || str === "SEQUENCE" || str === "KEYWORD") return true
  return false
}