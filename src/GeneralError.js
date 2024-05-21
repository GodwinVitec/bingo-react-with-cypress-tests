import {useRouteError} from "react-router-dom";

export default function GeneralError() {
  const {message} = useRouteError()
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}