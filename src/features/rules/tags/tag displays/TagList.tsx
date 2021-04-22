import React from "react"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import {Tag} from "./Tag"

export const TagList = () => {
  const queries = useSelector((state) => state.tags.counters)
  if (Object.keys(queries).length == 0) return null
  let queryElements: Tag[] = []
  for (let key in queries) {
    let tag = queries[key].tag
    queryElements.push(tag)
  }

  return (<ul>
    {...queryElements.map((query) => {
      return (
        <li>
          <Tag tag={query}/>
        </li>
      )
    })}
  </ul>)
}
