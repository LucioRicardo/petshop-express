const express = require('express');
const petshop = require('./petshop');
const app = express();


app.use(express.json());

//ROTAS!

app.get('/pets', (req, res) => {
    return res.json(petshop.listarPets());
});

app.post('/pets', (req, res) => {

    return res.json(petshop.adicionarMiAu(req.body));

});

app.listen(3000, () => {
    console.log('Servidor rodando!')
});

