import {Form, Link, redirect, useActionData} from "react-router-dom";
import BingoSvg from "../images/Bingo.svg";

//Styles
import "../../src/css/neat.minc619.css";
import "../pages/Auth/css/home.css"
import "../../src/css/util.css"
import {useMount} from "../hooks/useMount";
import {API_URLS} from "../constants/api-endpoints";
import axios from "axios";

export default function Home() {

  useMount(() => {
    console.log('API BASE URL', process.env.REACT_APP_API_BASE_URL);
  });

  return (
    <></>
  )
}

export async function checkToken() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const auth_url = `${apiBaseUrl}/${API_URLS.auth.auth_user}`;
  const token = localStorage.getItem('auth_token');

  if(!token || token === '') {
    return redirect('/login');
  }

  const res = await axios.get(auth_url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch((err) => {
    console.log(err);
    return redirect('/login');
  });

  console.log(res);

  if(res.status !== 200) {
    return redirect('/login');
  }

  return redirect('/dashboard');
}