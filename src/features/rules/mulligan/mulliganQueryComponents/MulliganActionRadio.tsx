import React from 'react'
import { ACTIONS } from '../../../../store/constants'
import { RadioChoices } from '../../../utils/generic/UI/RadioChoices'
import { useAppDispatch as useDispatch } from "../../../../store/hooks"
import { setMulliganAction } from '../../../../store/uiSlice'


export const MulliganActionRadio = () => {
  const dispatch = useDispatch()
  const handleChange = (action) => {
    dispatch(setMulliganAction(action))
  }
  
  return (
    <>
      <p>How should this card be mulliganed?</p>
      <RadioChoices
        options={ACTIONS}
        name={"actions radio border"}
        onSelectedChange={handleChange}
      />
    </>
  )
}
