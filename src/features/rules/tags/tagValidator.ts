import { isKeyword } from "../../utils/typeGuards";


export const tagValidator = (
  { type, turn, referents = null, groupName = null }: Tag,
  deck: Card[]
): Tag => {
  switch (type) {
    case "WITH": {
      if (referents)
        return { type, turn, referents };
      break;
    }
    case "SEQUENCE": {
      if (referents)
        return { type, turn, referents };
      break;
    }
    case "WITHOUT": {
      if (referents)
        return { type, turn, referents };
      break;
    }
    case "KEYWORD": {
      if (isKeyword(groupName)) {
        return { type, turn, groupName, referents };
      }

      break;
    }
    case "GROUP": {
      return { type, turn, groupName, referents };
    }
  }
};