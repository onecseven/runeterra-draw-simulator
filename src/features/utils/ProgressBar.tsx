import React from "react"
import './progressBar.scss'

export const ProgressBar = ({visible=false}) => {
  return (
    <div className={`progress ${visible ? "" : "hidden"}`} />
  )
}
