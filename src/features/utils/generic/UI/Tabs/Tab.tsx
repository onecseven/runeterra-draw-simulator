import React from "react"

type Props = {
  label: string
  role: string
  visible: boolean
  children?: React.ReactChild    | React.ReactChild[];
  id: number
  onClick: () => void
}

export const Tab = ({label, role, visible, children, id, onClick}: Props) => {
  return (
    <li className="tab-li">
      <input type="radio" name="tabs" id={role} className={`tab-input  ${visible ? "visible default" : ""}`}  />
      <label
        htmlFor={role}
        role="tab"
        aria-selected="true"
        aria-controls={"panel"+id}
        tabIndex={0}
        onClick={onClick} 
      >
        {label}
      </label>
      <div
        id={`tab-content${id}`}
        className={`tab-content ${visible ? "tab-visible" : ""}`}
        role="tabpanel"
        aria-labelledby="description"
        aria-hidden="false"
      >
        {children}
      </div>
    </li>
  )
}
