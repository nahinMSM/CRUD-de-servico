const imprimirConteudo = () => {
  const tasksListSearch = document.getElementById("tasks-list-search")
  const conteudoParaImpressao = `${tasksListSearch.innerHTML}`
  const janelaImpressao = window.open('', '_blank', 'width=50', 'height=50')
  janelaImpressao.document.write(`
    <html>
      <head>
        <title>Impressão de Tarefas</title>
      </head>
      <body>
        ${conteudoParaImpressao}
      </body>
    </html>
  `)
  janelaImpressao.document.close()
  janelaImpressao.print()
}

const impressao = document.getElementById("impressao")
impressao.addEventListener("click", () => {
  const divElement = document.querySelectorAll(".statusSearch")
  divElement.forEach((e) => {
    e.style.display = "block"
  })
  const imgElement = document.querySelectorAll(".statusSearch img, .btnDelete img")
  imgElement.forEach((e) => {
    e.style.display = "none"
  })
  const btnElement = document.querySelectorAll(".btnDelete")
  btnElement.forEach((e) => {
    e.style.display = "none"
  })
  imprimirConteudo()
})