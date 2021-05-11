export const validateMulligan = (
  card: Card["code"],
  action: mulliganAction,
  condition: mulliganCondition,
  reference: Card["code"]
): boolean => {
  if (card && action && condition) {
    if (condition != "ALWAYS" && reference) {
      return true
    } else if (condition == "ALWAYS") {
      return true
    } else {
      return false
    }
  } else return false
}
