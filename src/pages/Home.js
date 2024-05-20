import {Form, Link} from "react-router-dom";
import BingoSvg from "../images/Bingo.svg";

//Styles
import "../../src/css/neat.minc619.css";
import "../pages/Auth/css/home.css"
import "../../src/css/util.css"

export default function Home() {
  return (
    <div className="o-page o-page--center home">
      <div className="o-page__card">
        <div className="c-card c-card--center">
          <img src={`${BingoSvg}`} alt="Bingo" className="w-120"/>
          <Form action="/" method="POST">
            <div className="c-field">
              <label className="c-field__label">Email Address</label>
              <input className="c-input u-mb-small" type="email" name="user" placeholder="e.g. adam@sandler.com"
                     required/>
            </div>

            <div className="c-field">
              <label className="c-field__label">Password</label>
              <input className="c-input u-mb-small" type="password" name="pass" placeholder="********" required/>
              <input type="hidden" name="role" value="Partner"/>
            </div>

            <button type="submit" value="login" className="c-btn c-btn--fullwidth c-btn--info">Login</button>
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