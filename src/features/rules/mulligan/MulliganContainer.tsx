import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { selectCard } from "../../card/cardSlice"
import { MulliganQueryBuilder } from "./MulliganQueryBuilder"
import { MulliganList } from "./MulliganList"

export const MulliganContainer = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const [builderVisibility, setBuilderVisibility] = useState(false)
  const goDormant = useCallback(() => setBuilderVisibility(false), [])

  const addButton = (
    <button onClick={(e) => setBuilderVisibility(true)}>
      Add Mulligan Rule
    </button>
  )

  if (!selectedCard) return null

  return (
    <div>
      {builderVisibility ? (
        <MulliganQueryBuilder
          selectedCard={selectedCard}
          goDormant={goDormant}
        />
      ) : (
        addButton
      )}
      <MulliganList />
    </div>
  )
}
