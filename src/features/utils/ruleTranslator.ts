export const ruleTranslator = (
  referent: Card["code"],
  action: mulliganAction,
  condition: mulliganCondition,
  referenceCard: Card["code"],
  deck: Card[]
) => {
  let pastTense = (action: mulliganAction) =>
    action === "THROW" ? "thrown" : "kept"
  let howMany = () => {
    switch (action){
      case "KEEP_ALL":
        return "(all copies)"
      case "KEEP_ONE":
        return "(only one copy per mulligan)"
      case 'KEEP_TWO': 
        return "(at most two copies per mulligan)"
      default:
        return ''
    } 
  }
  let fullReferent = deck.find((card) => card.code == referent)
  let fullReference = deck.find((card) => card.code == referenceCard)
  let ERROR_STRING = `Malformed query
referent: ${referent}
action: ${action}
condition: ${condition}
referenceCard: ${referenceCard}
`
  if (condition !== "ALWAYS" && !fullReference) throw new Error(ERROR_STRING)
  switch (condition) {
    case "ALWAYS":
      return `${fullReferent.name} will be ${pastTense(action)} ${howMany()} every time.`
    case "ABSENCE":
      if (!fullReference) throw new Error(ERROR_STRING)
      return `${fullReferent.name} will be ${pastTense(action)}  ${howMany()}  when ${
        fullReference.name
      } is not in the mulligan.`
    case "PRESENCE":
      if (!fullReference) throw new Error(ERROR_STRING)
      return `${fullReferent.name} will be ${pastTense(action)}  ${howMany()}  when ${
        fullReference.name
      } is also in the mulligan.`
  }
}
