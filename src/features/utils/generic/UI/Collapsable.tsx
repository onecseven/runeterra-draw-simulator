import React, { useState } from "react"

declare interface collapsableProps {
  name: string
  children: React.ReactNode
  className: string
  openedByDefault: boolean
}

const Collapsable = ({ name, children, className = null, openedByDefault = true}: collapsableProps) => {
  const [open, toggle] = useState(openedByDefault)
  let sign = open ? "▼" : "▶"
  return (
    <>
      <div className={`collapser ${className}`} onClick={e => toggle(!open)}>
        {sign + " " + name}
      </div>
      <div className="collapsable" style={{ display: open ? "block" : "none" }}>
        {children}
      </div>
    </>
  )
}

export default Collapsable