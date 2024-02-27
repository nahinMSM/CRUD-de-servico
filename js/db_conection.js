// Importe as funções que você precisa dos SDKs que você precisa
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
// TODO: Adicionar SDKs para produtos Firebase que você deseja usar
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
// A configuração do Firebase do seu aplicativo da web
}

// Inicializar Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()

export const saveTask = (nome, local, ocorrencia, dataInicial, horaInicial, status, excluido, dataFinal, horaFinal, por) =>
  addDoc(collection(db, "tasks"), { nome, local, ocorrencia, dataInicial, horaInicial, status, excluido, dataFinal, horaFinal, por })

export const onGetTasks = (callback) => {
  const q = query(collection(db, "tasks"), orderBy("dataInicial", "desc"), orderBy("horaInicial", "desc"))
  return onSnapshot(q, callback)
}

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id))
export const getTask = (id) => getDoc(doc(db, "tasks", id))
export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields)
