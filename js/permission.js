import { Gerente } from "./Gerente.js"
import { Recepcao } from "./Recepcao.js"
import { Governanca } from "./Governanca.js"
import { Manutencao } from "./Manutencao.js"
const userName = document.getElementById("id")
if (userName.innerHTML === "Gerente") {
  Gerente()
}
if (userName.innerHTML === "Recepção") {
  Recepcao()
}
if (userName.innerHTML === "Governança") {
  Governanca()
}
if (userName.innerHTML === "Manutenção") {
  Manutencao()
}




