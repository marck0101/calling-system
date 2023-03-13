import { initializeApp } from "firebase/app"; // Inicializa  o APP
import { getAuth } from "firebase/auth"; // Autenticação
import { getFirestore } from "firebase/firestore"; // Para poder fazer a conexão
import { getStorage } from "firebase/storage"; // Para poder fazer a conexão

// credenciais
const firebaseConfig = {
  apiKey: "AIzaSyACN17xVsQOlvMm8K_BppZzQlIIpync_kU",
  authDomain: "tickets-9b6f8.firebaseapp.com",
  projectId: "tickets-9b6f8",
  storageBucket: "tickets-9b6f8.appspot.com",
  messagingSenderId: "775976410724",
  appId: "1:775976410724:web:6c654cc622bfc1f4348971",
  measurementId: "G-7VBCLKRJ7X",
};

const firebaseApp = initializeApp(firebaseConfig); // para iniciar

const auth = getAuth(firebaseApp); // para inicializar a autenticação
const db = getFirestore(firebaseApp); // é  o nosso banco
const storage = getStorage(firebaseApp); // é  o nosso banco

export { auth, db, storage };
