import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function Private({ children }){
    // aqui recebo as variaveis que estou exportando em value no Auth
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    return  <Navigate to="/" />
  }

  return children;

}