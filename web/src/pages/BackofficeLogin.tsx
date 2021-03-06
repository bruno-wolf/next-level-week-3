import React, {ChangeEvent, FormEvent, useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, Redirect } from 'react-router-dom';
import '../styles/pages/backoffice-login.css';
import logoImg from '../images/logo-square.svg';
import api from "../services/api";

function BackofficeLogin(){

  const [state, setState] = useState({redirect: ''});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remind, setRemind] = useState(false);

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const data = {
      username : username,
      password : password,
      // remind : String(remind)
    }

    await api.post('user', data).then(
      response => (
        response.data.login ? (console.log(response.data)) : (
             alert('oh damm!')
          )
        )
      );
  }

  return(
    <div className="content-wrapper">
      <div className="brand">
        <img src={logoImg} alt="logótipo Happy"/>
        <div className="location">
          <strong>Lisboa</strong>
          <span>Portugal</span>
        </div>
      </div>
      <div className="form-container">
        <Link to="/" className="btn-back">
          <FiArrowLeft size={26} color="rgba(0, 0, 0, .6" />
        </Link>

        <form 
          onSubmit={handleSubmit}
          className="login-form"
        >
          <fieldset>
            <legend>Login</legend>
            <div className="input-block">
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
                name="username"
                autoComplete="username"
              />
            </div>
            <div className="input-block">
              <label htmlFor="password">palavra-passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                name="password"
                autoComplete="current-password"
              />
            </div>
            <div className="links-container">
              <div className="checkbox-block">
                <input 
                  type="checkbox"
                  id="reminder"
                  checked={remind}
                  onChange={event => setRemind(event.target.checked)}
                />
                <label htmlFor="reminder">
                  Lembrar-me
                </label>
              </div>
              <Link to="/recover" className="btn-link">
                Recuperar palavra-passe
              </Link> 
            </div>
            <button type="submit" className="btn-entrar">Entrar</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default BackofficeLogin;