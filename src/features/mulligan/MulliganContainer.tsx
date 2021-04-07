import React, {useState} from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { selectCard } from "../card/cardSlice"
import { MulliganQueryBuilder } from "./MulliganQueryBuilder"

export const MulliganContainer = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const [builderVisibility, setBuilderVisibility] = useState(false)
  const addButton = (<button onClick={e => setBuilderVisibility(true)}></button>)

  if (!selectedCard) return null


  return (
  <div>
    {builderVisibility ? MulliganQueryBuilder : addButton}
  </div>)
}
