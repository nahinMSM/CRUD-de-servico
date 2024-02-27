import {
  onGetTasks,
  saveTask,
  getTask,
  updateTask,
} from "./db_conection.js"

export const Manutencao = () => {
  const preLoad = document.querySelector('.preLoad')
  const preloadModal = document.querySelector('.preloadModal')
  const taskForm = document.getElementById("task-form")
  const tasksList = document.getElementById("tasks-list")
  const tasksListInterditado = document.getElementById("tasks-list-interditado")
  const tasksListConcluido = document.getElementById("tasks-list-concluido")
  const dataSpan = document.getElementById("data")
  const horaSpan = document.getElementById("hora")
  const dataFimSpan = document.getElementById("data-fim")
  const horaFimSpan = document.getElementById("hora-fim")

  window.addEventListener("DOMContentLoaded", async () => {
    preLoad.style.display = "block"
    onGetTasks((querySnapshot) => {

      setTimeout(() => {
        preLoad.style.display = "none"
      }, 0)
      
      tasksList.innerHTML = ""
      tasksListInterditado.innerHTML = ""
      tasksListConcluido.innerHTML = ""
      querySnapshot.forEach((doc) => {
        const task = doc.data()
        if (task.status == "Aberto") {
          tasksList.innerHTML +=
            `<div class="res">
            <div class="res-list">
              <p class="nome">${task.nome}</p>
              <p class="local">${task.local}</p>       
              <p class="ocorrencia">${task.ocorrencia}</p>        
              <p class="data">${task.dataInicial}</p>        
              <p class="hora">${task.horaInicial}hs</p>
            </div>
            <div class="status">
              <div class="status-box">
                <h3>Status:</h3>
                <div class="bgStatus" style="background-color:green;">&#x1F558; ${task.status}</div>
              </div>
  
              <button class="btn-atualizar Atualizar bg" data-id="${doc.id}" > Atualizar</button>
  
            </div>
          </div>`
        }

        if (task.status == "Interditado") {
          tasksListInterditado.innerHTML +=
            `<div class="res" data-id="${doc.id}">
            <div class="res-list">
              <p class="nome">${task.nome}</p>
              <p class="local">${task.local}</p>       
              <p class="ocorrencia">${task.ocorrencia}</p>        
              <p class="data">${task.dataInicial}<br>${task.dataFinal}</p>        
              <p class="hora">${task.horaInicial}hs<br>${task.horaFinal}hs</p>
            </div>
            <div class="status">
              <div class="status-box">
                <h3>Status:</h3>
                <div class="bgStatus" style="background-color:yellow;"><b>&#161;</b> ${task.status}</div>
              </div>
 
              <div class="por">
                <strong>Por:</strong><p>${task.por}</p>
                <button class="btn-atualizar bg" data-id="${doc.id}"> Atualizar</button>
              </div>
  
            </div>
          </div>`
        }

        if (task.status == "Concluído") {
          tasksListConcluido.innerHTML +=
            `<div class="res">
          <div class="res-list">
            <p class="nome">${task.nome}</p>
            <p class="local">${task.local}</p>       
            <p class="ocorrencia">${task.ocorrencia}</p>        
            <p class="data">inici${task.dataInicial}<br>final${task.dataFinal}</p>        
            <p class="hora">inici${task.horaInicial}hs<br>final ${task.horaFinal}hs</p>
          </div>
          <div class="status">
            <div class="status-box">
              <h3>Status:</h3>
              <div class="bgStatus" style="background-color:red;">&#10004; ${task.status}</div>      
            </div>
            <div class="por"><strong>Por:</strong> <p>${task.por}</p></div>  
          </div>
        </div>`
        }
      })

      const btnsConcluded = document.querySelectorAll(".btn-atualizar")
      btnsConcluded.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id)
          const task = doc.data()
          openModal()
          taskForm["status-confirm"].style.display = "block"
          taskForm["status-confirm"].value = task.status
          taskForm["feito-por"].value = task.por
          taskForm["nome"].value = task.nome
          taskForm["local"].value = task.local
          taskForm["ocorrencia"].value = task.ocorrencia
          taskForm["excluir"].value = task.excluido

          const selectElement = document.getElementById("status-confirm")
          selectElement.addEventListener("change", () => {
            const selectedValue = selectElement.value

            if (selectedValue === "Aberto") {
              taskForm["nome"].style.display = "block"
              taskForm["local"].style.display = "block"
              taskForm["ocorrencia"].style.display = "block"
              taskForm["feito-por"].style.display = "none"
              taskForm["excluir"].style.display = "none"
              document.getElementById("salvar").innerHTML = "Atualizar"
              document.querySelector(".modal-header>h2").innerHTML = "Atualizar Serviço"

            } else if (selectedValue === "Interditado") {
              taskForm["nome"].style.display = "block"
              taskForm["local"].style.display = "block"
              taskForm["ocorrencia"].style.display = "block"
              taskForm["feito-por"].style.display = "block"
              taskForm["excluir"].style.display = "none"
              document.getElementById("salvar").innerHTML = "Atualizar"
              document.querySelector(".modal-header>h2").innerHTML = "Interdita Serviço"

            } else if (selectedValue === "Concluído") {
              taskForm["nome"].style.display = "block"
              taskForm["local"].style.display = "block"
              taskForm["ocorrencia"].style.display = "block"
              taskForm["feito-por"].style.display = "block"
              taskForm["excluir"].style.display = "none"
              document.getElementById("salvar").innerHTML = "Atualizar"
              document.querySelector(".modal-header>h2").innerHTML = "Concluir Serviço"

            } else if (selectedValue === "Excluir") {
              taskForm["feito-por"].style.display = "none"
              taskForm["nome"].style.display = "none"
              taskForm["local"].style.display = "none"
              taskForm["ocorrencia"].style.display = "none"
              taskForm["excluir"].style.display = "block"
              document.getElementById("salvar").innerHTML = "Salvar"
              document.querySelector(".modal-header>h2").innerHTML = "Excluir Serviço"

            } else {
              return ("Opção não reconhecida")
            }
          })

          editStatus = true
          id = doc.id
          document.getElementById("salvar").innerHTML = "Atualizar"
          document.querySelector(".modal-header>h2").innerHTML = "Atualizar Serviço"
        })
      })

    })
  })

  let editStatus = false
  let id = ""

  document.getElementById("salvar")
    .addEventListener("click", async (e) => {
      e.preventDefault()

      const status = taskForm["status-confirm"]
      const nome = taskForm["nome"]
      const local = taskForm["local"]
      const ocorrencia = taskForm["ocorrencia"]
      const por = taskForm["feito-por"]
      const excluido = taskForm["excluir"]

      const data = dataSpan.textContent
      const hora = horaSpan.textContent
      const dataF = dataFimSpan.textContent
      const horaF = horaFimSpan.textContent

      const dataAtual = new Date().toLocaleDateString()
      const horaAtual = new Date().toLocaleTimeString()

      const dataInicial = `${data} ${dataAtual}`
      const horaInicial = `${hora} ${horaAtual}`
      const dataFinal = `${dataF} ${dataAtual}`
      const horaFinal = `${horaF} ${horaAtual}`

      const selectElement = document.getElementById("status-confirm")
      const selectedValue = selectElement.value

      if (taskForm["local"].value === "") {
        local.focus()
        local.style.borderColor = "red"

      } else if (taskForm["ocorrencia"].value === "") {
        ocorrencia.focus()
        ocorrencia.style.borderColor = "red"
        local.style.borderColor = ""

      } else if (selectedValue === "Excluir" && taskForm["excluir"].value === "") {
        excluir.focus()
        excluir.style.borderColor = "red"
        ocorrencia.style.borderColor = ""
        local.style.borderColor = ""

      } else if (selectedValue === "Interditado" && taskForm["feito-por"].value === "") {
        por.focus()
        por.style.borderColor = "red"
        excluir.style.borderColor = ""
        ocorrencia.style.borderColor = ""
        local.style.borderColor = ""

      } else if (selectedValue === "Concluído" && taskForm["feito-por"].value === "") {
        por.focus()
        por.style.borderColor = "red"
        excluir.style.borderColor = ""
        ocorrencia.style.borderColor = ""
        local.style.borderColor = ""

      } else {
        preloadModal.style.display = 'block'
        taskForm["status-confirm"].style.display = "none"
        taskForm["nome"].style.display = "none"
        taskForm["local"].style.display = "none"
        taskForm["ocorrencia"].style.display = "none"
        taskForm["feito-por"].style.display = "none"
        taskForm["excluir"].style.display = "none"
        document.querySelector(".modal-footer").style.display = 'none'
        if (!editStatus) {
          await saveTask(
            nome.value,
            local.value,
            ocorrencia.value,
            dataInicial,
            horaInicial,
            status.value,
            excluido.value,
            dataFinal,
            horaFinal,
            por.value)
        } else {
          await updateTask(id, {
            nome: nome.value,
            local: local.value,
            ocorrencia: ocorrencia.value,
            status: status.value,
            excluido: excluido.value,
            dataFinal: dataFinal,
            horaFinal: horaFinal,
            por: por.value
          })

          editStatus = false
          id = ""
        }
        taskForm.reset()
        closeModal()
        Aberto()
      }
    })

  const openModal = () => {
    document.getElementById('fundo-modal').classList.add('active')
    document.getElementById('modal').classList.add('active')
    document.querySelector(".modal-header>h2").textContent = "Cadastrar novo Serviço"
    taskForm["status-confirm"].style.display = "none"
    taskForm["nome"].style.display = "block"
    taskForm["local"].style.display = "block"
    taskForm["ocorrencia"].style.display = "block"
    taskForm["feito-por"].style.display = "none"
    taskForm["excluir"].style.display = "none"
    document.querySelector(".modal-footer").style.display = 'block'
    document.getElementById("salvar").innerHTML = "Salvar"
  }

  const closeModal = () => {
    setTimeout(() => {
      preloadModal.style.display = "none"
    }, 0)
    document.getElementById('modal').classList.remove('active')
    document.getElementById('fundo-modal').classList.remove('active')
    local.style.borderColor = ""
    ocorrencia.style.borderColor = ""
    excluir.style.borderColor = ""
    taskForm["feito-por"].style.borderColor = ""
    editStatus = false
    id = ""
    taskForm.reset()
  }
  document.getElementById('cancelar').addEventListener("click", closeModal)
  document.getElementById('cadastrarServico').addEventListener("click", openModal)
}