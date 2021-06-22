import React from 'react'
import { CONDITIONS } from '../../../../store/constants'
import { RadioChoices } from '../../../utils/generic/UI/RadioChoices'
import { useAppDispatch as useDispatch } from "../../../../store/hooks"
import { setMulliganCondition } from '../../../../store/uiSlice'


export const MulliganConditionRadio = () => {
  
  const dispatch = useDispatch()
  const handleChange = (condition: mulliganCondition) => {
    dispatch(setMulliganCondition(condition))
  }

  var isChrome = navigator.appVersion.indexOf("Chrome/") !== -1

  
  return (
    <>
      <p>Under what conditions should the mulligan action be taken?</p>
      <RadioChoices
        options={CONDITIONS}
        name={`conditions radio border ${isChrome ? "chrome-radio" : ""}`}
        onSelectedChange={handleChange}
      />
    </>
  )
}
