import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"

type source = "Mulligan" | "Counter"

const FailureNotif = ({source}) => {
  return (
    <p className="notif-failure">
      {`❌ Error saving ${source}. Please try again.`}
    </p>
  )
}

const SuccessNotif = ({source}) => {
  return (
    <p  className="notif-success">
      {`✔ ${source} saved correctly.`}
    </p>
  )
}


export const NotificationFeedback = ({
  source,
}: {
  source: source
}) => {
  const renderState = useSelector((state) => state.ui.notification)
  if (renderState === "FAILURE") return <FailureNotif source={source} />
  else if (renderState === "SUCCESS") return <SuccessNotif source={source} />
  else if (renderState === null) return null
}
