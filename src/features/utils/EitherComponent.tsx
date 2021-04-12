

import React, { useState, useCallback } from "react"


const AddButton = ({swapBack, buttonText}: {swapBack (): void, buttonText: string}): JSX.Element => (
    <button onClick={(e) => swapBack}>
      Add Mulligan Rule
    </button>
  )

interface SwappingContainerProps {
  default ({swapBack}?: {swapBack(): void}): JSX.Element
  alternate ({swapBack}?: {swapBack(): void}): JSX.Element
  externalButton?: {
    text: string
    className: string
  }
}

export const SwappingContainer = (SwappingContainerProps: SwappingContainerProps) => {
  const [visibility, setVisibility] = useState(true)
  const swapBack = useCallback(() => setVisibility(!visibility), [])
  return (
    <>
    {visibility ? SwappingContainerProps.default({swapBack}) : SwappingContainerProps.alternate({swapBack})}
    {SwappingContainerProps.externalButton ? (<AddButton swapBack={swapBack} buttonText={SwappingContainerProps.externalButton.text} />) :}
    </>
  )
}