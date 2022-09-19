const express = require('express')
const {v4: uuidv4} = require ('uuid')
const app = express()
//aplicamos um middleware
app.use(express.json())

//construir uma base volátil
const observacoesPorlembreteId = {}

//localhost:5000/lembretes/abcd/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    //desestruturação do JS
    //req.body = {texto: "Comprar açúcar!"}
    //const texto = req.body.texto
    const { texto } = req.body
    //a linha 16 faz o mesmo serviço que a 15 faria
    //req.params é um objeto que representa os parâmetros da requisição
    //o nome id representa o id contido na URL. req.params.id
    const observacoesdoLembrete = observacoesPorlembreteId [req.params.id] || []
    observacoesdoLembrete.push({idDaObservacao: idObs, textoQueEuQueroGuardar: texto})
    observacoesPorlembreteId[req.params.id] = observacoesdoLembrete
    //(201) = CREATED
    res.status(201).send(observacoesdoLembrete)
})

//localhost:5000/lembretes/:id/observacoes
app.get('/lembrtes/:id/observacoes', (req, res) => {
    res.send(observacoesPorlembreteId[req.params.id] || [])
})

//colocar pra funcionar o servidor
app.listen(5000, () => console.log('Observacoes. Porta 5000'))

