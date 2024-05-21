import {Navigate, Outlet, useLoaderData, useRouteError} from "react-router-dom";
import axios from "axios";
import {API_URLS} from "../constants/api-endpoints";
import {useState} from "react";
import {useMount} from "../hooks/useMount";

export default function PrivateRouteLayout() {
  const {authorized, user} = useLoaderData();

  return (
    authorized ? <Outlet context={user} /> : <Navigate to={'/'} />
  )
}

export const authorizeRoute = async() => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const auth_url = `${apiBaseUrl}/${API_URLS.auth.auth_user}`;
  const token = localStorage.getItem('auth_token');

  if(!token || token === '') {
    throw Error('Oops! We could not access that page.');
  }

  console.log('token', token);

  const res = await axios.get(auth_url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('res', res);

  return {
    authorized: res.status === 200,
    user: res.status === 200 ? res.data?.data : null
  };
}