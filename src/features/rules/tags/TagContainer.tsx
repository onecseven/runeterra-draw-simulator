import React, { useState, useCallback } from "react"
import { TagQueryBuilder } from "./TagQueryBuilder"
import { TagList } from "./tag displays/TagList"
import { useStateCallback } from "../../utils/generic/useStateCallback"

export const TagContainer = () => {
  const [builderVisibility, setBuilderVisibility] = useStateCallback(false)

  const addButton = (
    <button onClick={(e) => setBuilderVisibility(true)}>Add Tag</button>
  )

  return (
    <>
      {builderVisibility ? (
        <TagQueryBuilder goDormant={() => setBuilderVisibility(false)} />
      ) : (
        addButton
      )}
      <TagList />
    </>
  )
}
