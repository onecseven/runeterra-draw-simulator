import React from "react"
import { MulliganQueryBuilder } from "./MulliganQueryBuilder"
import { MulliganList } from "./MulliganList"
import { useStateCallback } from "../../utils/useStateCallback"

export const MulliganContainer = () => {
  const [builderVisibility, setBuilderVisibility] = useStateCallback(false)

  const addButton = (
    <button onClick={() => setBuilderVisibility(true)}>
      Add Mulligan Rule
    </button>
  )

  return (
    <>
      {builderVisibility ? (
        <MulliganQueryBuilder
          goDormant={() => setBuilderVisibility(false)}
        />
      ) : (
        addButton
      )}
      <MulliganList />
    </>
  )
}
