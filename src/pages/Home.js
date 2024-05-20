import {Form} from "react-router-dom";
import BingoSvg from "../images/Bingo.svg";

//Styles
import "../../src/css/neat.minc619.css";
import "../pages/Auth/css/home.css"

export default function Home() {
  return (
    <div className="o-page o-page--center home">
      <div className="o-page__card">
        <div className="c-card c-card--center">
          <img src={`${BingoSvg}`} alt="Bingo" style={{width:"120px"}}/>
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
          <div className="ss_btn d-flex">
            <div className="u-text-left" style={{marginTop: "10px", marginRight: "auto"}}><a href="forgot_password.php">Forgot
              Password?</a></div>
            <div className="u-text-right" style={{marginTop: "10px"}}><a href="retailer_signup.php">Create new
              account?</a></div>
          </div>
          <div style={{padding: "10px"}}></div>
        </div>
      </div>
    </div>
  )
}