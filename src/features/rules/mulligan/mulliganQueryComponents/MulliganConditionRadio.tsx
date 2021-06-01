import React from 'react'
import { CONDITIONS } from '../../../../store/constants'
import { RadioChoices } from '../../../utils/generic/UI/RadioChoices'
import { useAppDispatch as useDispatch } from "../../../../store/hooks"
import { setMulliganCondition } from '../../../../store/uiSlice'


export const MulliganConditionRadio = () => {
  const dispatch = useDispatch()
  const handleChange = (condition) => {
    dispatch(setMulliganCondition(condition))
  }
  
  return (
       <RadioChoices
        options={CONDITIONS}
        name={"conditions radio"}
        onSelectedChange={handleChange}
      />
  )
}
