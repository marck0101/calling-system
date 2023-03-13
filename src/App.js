import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// todos os componentes, todas as rotas são children do AthProvider
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
