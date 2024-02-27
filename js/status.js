const tasksList = document.getElementById("tasks-list")
const tasksListInterditado = document.getElementById("tasks-list-interditado")
const tasksListConcluido = document.getElementById("tasks-list-concluido")
const tasksListSearch = document.getElementById("tasks-list-search")

 const Aberto = () => {
  tasksList.style.display = "block"
  tasksListInterditado.style.display = "none"
  tasksListConcluido.style.display = "none"
  tasksListSearch.style.display = "none"
  impressao.style.display = "none"
  btAberto.classList.add('Activ')
  btInterditado.classList.remove('Activ')
  btInterditado.style.color = ""
  btConcluido.classList.remove('Activ')
  document.getElementById("searchInput").value = ""
  document.getElementById("searchButton").disabled = true
}

const Interditado = () => {
  tasksList.style.display = "none"
  tasksListInterditado.style.display = "block"
  tasksListConcluido.style.display = "none"
  tasksListSearch.style.display = "none"
  impressao.style.display = "none"
  btAberto.classList.remove('Activ')
  btInterditado.classList.add('Activ')
  btInterditado.style.color = "black"
  btConcluido.classList.remove('Activ')
  document.getElementById("searchInput").value = ""
  document.getElementById("searchButton").disabled = true
}

const Concluido = () => {
  tasksList.style.display = "none"
  tasksListInterditado.style.display = "none"
  tasksListConcluido.style.display = "block"
  tasksListSearch.style.display = "none"
  impressao.style.display = "none"
  btAberto.classList.remove('Activ')
  btInterditado.classList.remove('Activ')
  btInterditado.style.color = ""
  btConcluido.classList.add('Activ')
  document.getElementById("searchInput").value = ""
  document.getElementById("searchButton").disabled = true
}

const btAberto = document.querySelector('#btAberto')
btAberto.addEventListener("click", Aberto)

const btInterditado = document.querySelector('#btInterditado')
btInterditado.addEventListener("click", Interditado)

const btConcluido = document.querySelector('#btConcluido')
btConcluido.addEventListener("click", Concluido)