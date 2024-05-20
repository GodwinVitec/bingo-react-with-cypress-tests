import {useRouteError} from "react-router-dom";

export default function UnauthenticatedError() {
  const {message} = useRouteError()
  return (
    <div>
      <h2>{message}</h2>
      <p>You are not authenticated to view this page.</p>
    </div>
  )
}