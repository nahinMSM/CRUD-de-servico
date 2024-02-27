import {
  onGetTasks,
  deleteTask
} from "./db_conection.js"

const tasksListSearch = document.getElementById("tasks-list-search")
const tasksList = document.getElementById("tasks-list")
const tasksListInterditado = document.getElementById("tasks-list-interditado")
const tasksListConcluido = document.getElementById("tasks-list-concluido")
const tasksListExcluido = document.getElementById("tasks-list-excluir")
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")
const preload = document.querySelector('.preload')

const Search = () => {
  if (window.innerWidth < 1000) {
    impressao.style.display = "none"
  } else {
    impressao.style.display = "block"
  }

  const searchInput = document.getElementById("searchInput").value.toLowerCase()
  const filteredTasks = []
  onGetTasks((querySnapshot) => {
    tasksListSearch.innerHTML = ""
    querySnapshot.forEach((doc) => {
      const task = doc.data()

      if (
        task.nome.toLowerCase().includes(searchInput) ||
        task.local.toLowerCase().includes(searchInput) ||
        task.ocorrencia.toLowerCase().includes(searchInput) ||
        task.por.toLowerCase().includes(searchInput) ||
        task.dataFinal.toLowerCase().includes(searchInput) ||
        task.status.toLowerCase().includes(searchInput)
      ) {
        filteredTasks.push(doc)
      }
    })
    filteredTasks.forEach((doc) => {
      const task = doc.data()
      if (task.status === 'Aberto') {
        tasksListSearch.innerHTML +=
          `<div class="res">
          <div class="res-list">
          <hr>
            <p class="nome">${task.nome}</p>
            <p class="local">${task.local}</p>       
            <p class="ocorrencia">${task.ocorrencia}</p>        
            <p class="data">${task.dataInicial}</p>        
            <p class="hora">${task.horaInicial}</p>
          </div>
          <div class="status">
            <div class="status-box">
              <h3>Status:</h3>
              <button class="btnDelete bg bgStatus" data-id="${doc.id}" style="background-color: green;">
                <img src="img/lupa.png" alt="search"> ${task.status}
              </button> 
              <div class="statusSearch" style="background-color: green;">
                <img src="img/lupa.png" alt="search"> ${task.status}
              </div> 
            </div>          
          </div>
        </div>`

      } else if (task.status === 'Interditado') {
        tasksListSearch.innerHTML +=
          `<div class="res">
        <div class="res-list">
          <hr>
          <p class="nome">${task.nome}</p>
          <p class="local">${task.local}</p>       
          <p class="ocorrencia">${task.ocorrencia}</p>        
          <p class="data">${task.dataInicial}<br>${task.dataFinal}</p>        
          <p class="hora">${task.horaInicial}<br>${task.horaFinal}</p>
        </div>
        <div class="status">
          <div class="status-box">
            <h3>Status:</h3>
            <button class="btnDelete bg bgStatus" data-id="${doc.id}" style="background-color: yellow; color: black;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </button>
            <div class="statusSearch" style="background-color: yellow; color: black;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </div> 
          </div>
          <div class="por"><strong>Por:</strong> <span>${task.por}</span></div>
        </div>
      </div>`

      } else if (task.status === 'Concluido' || task.status === "Concluído") {
        tasksListSearch.innerHTML +=
          `<div class="res">
        <div class="res-list">
        <hr>
          <p class="nome">${task.nome}</p>
          <p class="local">${task.local}</p>       
          <p class="ocorrencia">${task.ocorrencia}</p>        
          <p class="data">${task.dataInicial}<br>${task.dataFinal}</p>        
          <p class="hora">${task.horaInicial}<br>${task.horaFinal}</p>
        </div>
        <div class="status">
          <div class="status-box">
            <h3>Status:</h3>
            <button class="btnDelete bg bgStatus" data-id="${doc.id}" style="background-color: red;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </button> 
            <div class="statusSearch" style="background-color: red;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </div> 
          </div>
          <div class="por"><strong>Por:</strong> <span>${task.por}</span></div>
        </div>
      </div>`

      } else if (task.status === 'Excluir') {
        tasksListSearch.innerHTML +=
          `<div class="res">
        <div class="res-list">
        <hr>
          <p class="nome">${task.nome}</p>
          <p class="local">${task.local}</p>       
          <p class="ocorrencia">${task.ocorrencia}</p>        
          <p class="data">inici${task.dataInicial}<br>final${task.dataFinal}</p>        
          <p class="hora">inici${task.horaInicial}hs<br>final ${task.horaFinal}hs</p>
        </div>
        <div class="status">
          <div class="status-box">
            <h3>Status:</h3>
            <button class="btnDelete bg bgStatus" data-id="${doc.id}" style="background-color: grey;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </button> 
            <div class="statusSearch" style="background-color: grey;">
              <img src="img/lupa.png" alt="search"> ${task.status}
            </div> 
          </div>
          <div class="exclui"> ${task.excluido}</div>
        </div>
      </div>`
      }
    })

    const userName = document.getElementById("id")
    const statusSearch = tasksListSearch.querySelectorAll(".statusSearch")
    statusSearch.forEach((div) => {
      if (userName.innerHTML == "Gerente") {
        div.style.display = "none"
      }
    })

    const btnDelete = tasksListSearch.querySelectorAll(".btnDelete")
    btnDelete.forEach((btn) => {
      if (userName.innerHTML != "Gerente") {
        btn.style.display = "none"
      }
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const response = confirm('Deseja realmente deletar?')
        if (response) {
          await deleteTask(dataset.id)
        } else {
          return
        }
      })
    })
  })

}

searchButton.disabled = true
searchInput.addEventListener("input", function () {

  if (searchInput.value.trim() !== '') {
    searchButton.disabled = false
  } else {
    searchButton.disabled = true
  }
})

searchButton.addEventListener("click", async () => {
  tasksList.style.display = "none"
  tasksListInterditado.style.display = "none"
  tasksListConcluido.style.display = "none"
  tasksListExcluido.style.display = "none"
  tasksListSearch.style.display = "block"
  btAberto.classList.remove('Activ')
  btInterditado.classList.remove('Activ')
  btConcluido.classList.remove('Activ')
  Search()
})