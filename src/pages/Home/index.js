import { useState } from "react";
import { Link } from "react-router-dom";

import { db, auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if(email === "" || password === "") {
        return alert("Preencha todos os campos");
    }

    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/admin', { replace: true });
    })
    .catch((error) => {
        console.log(error);
    });    
  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <Link className="button-link" to="/register">
        Não possui cadastro? Cadastrar
      </Link>
    </div>
  );
}

export default Home;
