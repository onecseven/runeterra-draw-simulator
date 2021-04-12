import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import {TagQueryBuilder} from './TagQueryBuilder'
import {TagList} from './TagList'

export const TagContainer = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const [builderVisibility, setBuilderVisibility] = useState(false)
  const goDormant = useCallback(() => setBuilderVisibility(false), [])

  const addButton = (
    <button onClick={(e) => setBuilderVisibility(true)}>
      Add Tag
    </button>
  )

  if (!selectedCard) return null

  return (
    <>
      {builderVisibility ? (
        <TagQueryBuilder
          selectedCard={selectedCard}
          goDormant={goDormant}
        />
      ) : (
        addButton
      )}
      <TagList />
    </>
  )
}
