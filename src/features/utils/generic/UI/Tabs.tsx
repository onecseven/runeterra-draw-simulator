import React from "react"
import "./tabs.scss"

export const RulesContainer = () => {

  return (
    <ul className="tabs" role="tablist">
      <li className="tab-li">
        <input type="radio" name="tabs" id="tab1" className="tab-input" checked />
        <label
          htmlFor="tab1"
          role="tab"
          aria-selected="true"
          aria-controls="panel1"
          tabIndex={0}
        >
          Mulligan
        </label>
        <div
          id="tab-content1"
          className="tab-content"
          role="tabpanel"
          aria-labelledby="description"
          aria-hidden="false"
        >
          {/* one child */}
        </div>
      </li>
    </ul>
  )
}
{/* <li className="tab-li">
<input type="radio" name="tabs" className="tab-input" id="tab2" />
<label
  htmlFor="tab2"
  role="tab"
  aria-selected="false"
  aria-controls="panel2"
  tabIndex={0}
>
  Counters
</label>
<div
  id="tab-content2"
  className="tab-content"
  role="tabpanel"
  aria-labelledby="specification"
  aria-hidden="true"
>
  <TagQueryBuilder/>
</div>
</li> */}