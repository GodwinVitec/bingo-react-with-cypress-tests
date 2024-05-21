import { useOutletContext} from "react-router-dom";

export default function Dashboard() {
  const routeProps = useOutletContext();

  console.log(routeProps);
  return (
    <div className='dashboard'></div>
  )
}