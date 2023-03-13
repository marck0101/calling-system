import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";

import { db, storage } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

import "./profile.css";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image)); // passando a imagem por ObjectURL
      } else {
        toast.warn("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    // storage = acesso ao storage, a nossa referência abaixo
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
    //uploadRef = onde eu quero enciar a imagem
    const uploadTask = uploadBytes(uploadRef, imageAvatar)
      // Aqui vai enviar a imagem ao banco de dados
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlFoto = downloadURL;
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome: nome,
          }).then(() => {
            let data = {
              ...user,
              nome: nome,
              avatarUrl: urlFoto,
            };
            setUser(data);
            storageUser(data);
            toast.success("Atualizado com sucesso!");
          });
        });
      });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // pra não atualizar a pag

    if (imageAvatar === null && nome !== "") {
      // Atualizar apenas o nome do user
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!");

        // se o await der certo, vai atualizar a variavel de nome no firebase e no localStorage
      });
    } else if (nome !== "" && imageAvatar !== null) {
      // Atualizar tanto nome quanto a foto
      handleUpload();
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              {/* accept="image/*" && que tipo de input quero aceitar, no caso vai ser imagem */}
              <input type="file" accept="image/*" onChange={handleFile} />{" "}
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            {/* Email disable para que o usuário não possa editar o email inserido no cadastro */}
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
