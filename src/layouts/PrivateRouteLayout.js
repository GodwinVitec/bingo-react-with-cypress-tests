import {Outlet} from "react-router-dom";
import axios from "axios";

export default function PrivateRouteLayout() {
  return (
    <Outlet />
  )
}

export const authorizeRoute = async() => {
  const auth_url = "http://localhost:8000/api/user";
  const token = localStorage.getItem('auth_token');

  if(!token || token === '') {
    throw Error('Oops! We could not access that page.');
  }

  const res = await axios.get(auth_url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {authorized: res.status === 200};
}