import "./admin.css";

import { Component, useState, useEffect } from "react";
import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@userData");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });
          setTarefas(lista);
        });
      }
    }
    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if(edit?.id){
      handleUpdateTarefa();
      return;
    }

    if (tarefaInput === "") {
      alert("Digite uma tarefa");
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        alert("Tarefa adicionada com sucesso");
        setTarefaInput("");
      })
      .catch((error) => {
        alert("Não foi possível adicionar a tarefa");
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef)
      .then(() => {
        alert("Tarefa concluída");
      })
      .catch((error) => {
        alert("Não foi possível concluir a tarefa");
      });
  }

  async function editTarefa(item) {
    setTarefaInput(item.tarefa);    
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefaInput,
    })
      .then(() => {
        alert("Tarefa atualizada com sucesso");
        setTarefaInput("");
        setEdit({});
      })
      .catch((error) => {
        alert("Não foi possível atualizar a tarefa");
        setTarefaInput("");
        setEdit({});
    })
  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa"
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" style={{ backgroundColor: 'purple' }} type="submit">
          Atualizar tarefa
        </button>
        ) : (
          <button className="btn-register" type="submit">
          Registrar tarefa
        </button>
        )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>

          <div>
            <button onClick={ () => editTarefa(item) }>Editar</button>
            <button
              className="btn-delete"
              onClick={() => deleteTarefa(item.id)}
            >
              Concluir
            </button>
          </div>
        </article>
      ))}
      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Admin;
