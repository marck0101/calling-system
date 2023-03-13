import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function hadleLogout() {
    await logout();
  }
  return (
    <>
      <div>
        <Header />
        <h1>Dashboard</h1>
        <button onClick={hadleLogout}>sair da conta</button>
      </div>
    </>
  );
}
