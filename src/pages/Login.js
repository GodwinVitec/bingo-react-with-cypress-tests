import {Form, Link, redirect, useActionData} from "react-router-dom";
import BingoSvg from "../images/Bingo.svg";

//Styles
import "../../src/css/neat.minc619.css";
import "../pages/Auth/css/home.css"
import "../../src/css/util.css"
import {useMount} from "../hooks/useMount";
import {API_URLS} from "../constants/api-endpoints";
import axios from "axios";

export default function Login() {
  const loginResponse = useActionData();

  useMount(() => {
    console.log('API BASE URL', process.env.REACT_APP_API_BASE_URL);
  });

  return (
    <div className="o-page o-page--center home">
      <div className="o-page__card">
        <div className="c-card c-card--center">
          <img src={`${BingoSvg}`} alt="Bingo" className="w-120"/>
          {loginResponse?.error && <p className="form-error u-text-danger mt-10">{loginResponse.error}</p>}
          <Form action="/login" method="post">
            <div className="c-field">
              <label className="c-field__label">Email Address</label>
              <input className="c-input u-mb-small" type="email" name="user" placeholder="e.g. adam@sandler.com"
                     required/>
            </div>

            <div className="c-field">
              <label className="c-field__label">Password</label>
              <input className="c-input u-mb-small" type="password" name="password" placeholder="********" required/>
              <input type="hidden" name="role" value="Partner"/>
              <input type="hidden" name="device_type" value="android"/>
            </div>

            <button type="submit" className="c-btn c-btn--fullwidth c-btn--info">Login</button>
          </Form>
          <div className="ss_btn d-flex mt-10 form-footer">
            <div className="u-text-left mr-auto">
              <Link to="">Forgot Password?</Link>
            </div>
            <div className="u-text-right">
              <Link to="">Create new account?</Link>
            </div>
          </div>
          <div className='p-10'></div>
        </div>
      </div>
    </div>
  )
}

export const login = async ({request}) => {
  const data = await request.formData();

  const submission = {
    email: data.get('user'),
    password: data.get('password'),
    role: data.get('role'),
    device_type: data.get('device_type')
  }

  // send your post request

  if (submission.role !== 'Partner') {
    redirect('/');
  }

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const encryptEndpoint = `${apiBaseUrl}/${API_URLS.common.encrypt}`;

  const encryptEmail = await axios.post(encryptEndpoint, {data: submission.email});

  if(encryptEmail.status !== 200) {
    return {error: 'Unable to access the server at this time. Please try again later.'}
  }

  const encryptPassword = await axios.post(encryptEndpoint, {data: submission.password});

  if(encryptPassword.status !== 200) {
    return {error: 'Unable to access the server at this time. Please try again later.'}
  }

  const encryptedSubmission = {
    email: encryptEmail.data?.data,
    password: encryptPassword.data?.data,
    role: submission.role,
    device_type: submission.device_type,
    device_token: process.env.REACT_APP_DEVICE_TOKEN
  };

  const loginResponse = await axios.post(`${apiBaseUrl}/${API_URLS.auth.login}`, encryptedSubmission);

  if(loginResponse.status !== 200 || loginResponse?.data?.success === false) {
    return {error: loginResponse?.data?.message ?? 'Unable to access the server at this time. Please try again later.'};
  }

  const {token} = loginResponse?.data?.data;

  localStorage.setItem('auth_token', token);

  if(!localStorage.getItem('auth_token')) {
    return {error: 'Unable to access the server at this time. Please try again later.'};
  }

  // redirect the user
  return redirect('/dashboard');
}