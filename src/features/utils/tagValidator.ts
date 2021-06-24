import { isKeyword } from "./typeGuards"

export const tagValidator = (
  { type, turn, referents = null, groupName = null }: Tag,
  deck: Card[]
): Tag => {
  switch (type) {
    case "WITH": {
      if (referents && referents.length > 0 ) {
        return { type, turn, referents, groupName }
      }
      break
    }
    case "SEQUENCE": {
      if (referents && referents.length > 0 ) return { type, turn, referents, groupName }
      break
    }
    case "WITHOUT": {
      if (referents && referents.length > 0 ) return { type, turn, referents, groupName }
      break
    }
    case "KEYWORD": {
      if (isKeyword(groupName) && referents && referents.length > 0) {
        return { type, turn, groupName, referents }
      }

      break
    }
    case "ANY": {
      return { type, turn, referents }
    }
  }
  return null
}
