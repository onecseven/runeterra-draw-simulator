import React, { useState } from 'react'
import {Tab} from "./Tab"
import "./tabs.scss"

type Props = {
  labels: string[]
  children?: React.ReactChild[];
  onChange?: () => void
}

export const Tabs = ({children, labels, onChange}: Props) => {
  const [visibleID, setVisibleID] = useState(0)
  const handleClick = (id) => {
    setVisibleID(id)
    onChange ? onChange() : null
  }
  return (
    <div className="tabs" role="tablist">
      {children.map((child, id) => {
        return(
        <Tab 
        label={labels[id]}
        key={"tab"+id}
        id={id}
        visible={id === visibleID}
        onClick={() => handleClick(id)}
        >
          {child}
        </Tab>)
      })}
    </div>
  )
}
