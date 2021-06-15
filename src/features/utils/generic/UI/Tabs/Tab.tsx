import React from "react"

type Props = {
  label: string
  key: string
  visible: boolean
  children?: React.ReactChild    | React.ReactChild[];
  id: number
  onClick: () => void
}

export const Tab = ({label, key, visible, children, id, onClick}: Props) => {
  return (
    <li className="tab-li">
      <input type="radio" name="tabs" id={key} className={`tab-input  ${visible ? "visible default" : ""}`}  />
      <label
        htmlFor={key}
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
