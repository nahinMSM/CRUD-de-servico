document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault()
  location.reload()
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  let passwordsArray = []

  if (window.innerWidth < 1000) {
    
    passwordsArray = [
      { username: "Gerente", password: "" },
      { username: "Governança", password: "" },
      { username: "Manutenção", password: "" }
    ]
  } else {
    passwordsArray = [
      { username: "Gerente", password: "" },
      { username: "Recepção", password: "" },
      { username: "Governança", password: "" },
      { username: "Manutenção", password: "" }
    ]
  }
  
  function checkCredentials() {
    for (const user of passwordsArray) {
      if (username === user.username && password === user.password) {
        localStorage.setItem("index", "true")
        document.getElementById("id").innerHTML = `${username}`
        return true
      }
    }
    return false
  }

  if (checkCredentials()) {
    localStorage.setItem("username", username)
  } 
  else {
    alert("Senha inválida. Tente novamente.")
  }
})
const storedUsername = localStorage.getItem("username")
const isLoggedIn = localStorage.getItem("index")

if (isLoggedIn === "true") {
  document.getElementById("loginForm").style.display = "none"
  document.getElementById("id").innerHTML = storedUsername
  document.getElementById("navLog").style.display = "block"
  document.querySelector(".Title").style.display = "block"
  document.getElementById("logoutBtn").style.display = "block"
  document.querySelector('main').style.display = "block"
  document.getElementById('search').style.display = "block"
  document.getElementById('impressao').style.display = "none"
  btAberto.classList.add('Activ')
}

const logout = () => {
  const response = confirm('Deseja realmente sair?')
  if (response) {
    localStorage.setItem("index", "false")
    document.getElementById("navLog").style.display = "none"
    document.querySelector(".Title").style.display = "none"
    document.getElementById("logoutBtn").style.display = "none"
    document.querySelector('main').style.display = "none"
    document.getElementById('search').style.display = "none"
    document.getElementById("loginForm").style.display = "block"
  } else {
    return
  }
}

document.getElementById("logoutBtn").addEventListener("click", logout)