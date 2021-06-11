import React from "react"
import "./rules.scss"
import { MulliganQueryBuilder } from "./mulligan/MulliganQueryBuilder"
import { TagQueryBuilder } from "./tags/TagQueryBuilder"


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
          <MulliganQueryBuilder/>
        </div>
      </li>

      <li className="tab-li">
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
      </li>
      <li className="tab-li">
        <input type="radio" name="tabs" className="tab-input" id="tab3" />
        <label
          htmlFor="tab3"
          role="tab"
          aria-selected="false"
          aria-controls="panel3"
          tabIndex={0}
        >
          REVIEW
        </label>
        <div
          id="tab-content3"
          className="tab-content"
          role="tabpanel"
          aria-labelledby="specification"
          aria-hidden="true"
        >
          <p>hi</p>
        </div>
      </li>
    </ul>
  )
}
