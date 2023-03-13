import "./signin.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  //                      'variavel' que possui todas informações de context
  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();
    if (email !== "" && passWord !== "") {
      await signIn(email, passWord);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <h1>Senha</h1> */}
          <input
            type="password"
            placeholder="******"
            value={passWord}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" value="acessar">
            {loadingAuth ? "Carregendo..." : "Acessar"}
          </button>
        </form>
        <Link to={"/register"}>Criar uma conta</Link>
      </div>
    </div>
  );
}
