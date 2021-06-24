import React, { useState } from "react"
import { useReset } from "../../useReset"
import { Tab } from "./Tab"
import "./tabs.scss"

type Props = {
  labels: string[]
  children?: React.ReactChild[]
  onChange?: () => void
}

export const Tabs = ({ children, labels, onChange }: Props) => {
  const [visibleID, setVisibleID] = useState(0)
  const [formKey, refresh] = useReset()
  const handleClick = (id) => {
    refresh()
    setVisibleID(id)
    onChange ? onChange() : null
  }
  return (
    <div className="tabs" role="tablist">
      {children.map((child, id) => {
        return (
          <React.Fragment key={`${formKey}${id}`}>
            <Tab
              label={labels[id]}
              role={"tab" + id}
              id={id}
              visible={id === visibleID}
              onClick={() => handleClick(id)}
            >
              {child}
            </Tab>
          </React.Fragment>
        )
      })}
    </div>
  )
}
