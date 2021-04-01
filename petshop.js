const moment = require('moment');
const fs = require('fs');

let db = fs.readFileSync('./db.json', 'utf-8');
db = JSON.parse(db);

const petshop = {
    atualizarBanco: () => {
        fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8');
    },

    buscarPet: nome => {
        let encontrado = db.pets.find(pet => pet.nome == nome);
            return encontrado;
    },

    listarPets: () => {

        petshop.atualizarBanco();
        let texto = "";

        db.pets.forEach(pet => {
            let {nome, tipo, raca, tutor, vacinado, servicos} = pet;
            
            texto += (`Nome: ${nome}, Tipo: ${tipo}, Raça: ${raca}, Tutor: ${tutor}, Vacinado?: ${vacinado ? "Vacinado" : "Não Vacinado"} `);
            servicos.forEach(servico => {
                texto += (`${servico.serviço} - ${servico.data}`);
            });
        });

        return texto;

    },

    vacinarPet: nome => {
        pet = buscarPet(nome);
        if(!pet.vacinado){
            pet.vacinado = true;
            console.log(`\nO pet ${pet.nome} foi vacinado.`);
        } else {
            console.log(`\n${pet.nome} já foi vacinado anteriormente.`)
        }
    
        atualizarBanco();
    
    },

    campanhaVacina: () => {
        let naoVacinados = db.pets.filter(pet => pet.vacinado == false);
        naoVacinados.map(pet => vacinarPet(pet));
        console.log(`\n${naoVacinados.length} pets foram vacinados nessa campanha.`);
     
    },

    adicionarMiAu: arrayPets => {
        
        db.pets.push(...arrayPets);

        petshop.atualizarBanco();
    
        arrayPets.forEach(pet => {
            console.log(`${pet.nome} foi adicionado.`)
        });
    },

    darBanhoPet: nome => {
        pet = buscarPet(nome);
        pet.servicos.push({
                'serviço':'banho',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`\nO pet ${pet.nome} está de banho tomado!`);
    
        atualizarBanco();
    
    },

    tosarPet: nome => {
        pet = buscarPet(nome);
            pet.servicos.push({
                'serviço':'tosa',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`\nO pet ${pet.nome} está com cabelinho na régua!`);
    
        atualizarBanco();
    
    },

    apararUnhasPet: nome => {
        pet = buscarPet(nome);
            pet.servicos.push({
                'serviço':'unhas aparadas',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`\nO pet ${pet.nome} está de unhas aparadas!`);
    
        atualizarBanco();
    
    },

    atenderCliente: (pet, servico) => {
        console.log("\nOlá, seja MUITO BEM-VINDO!",
                    "\nPor favor, aguarde. Logo você será atendido!",
                    "\nServiço em execução..."
        );
        
        servico(pet);
    
        console.log("\nObrigado e até uma próxima!");
    
        atualizarBanco();
    
    }

}

module.exports = petshop;
