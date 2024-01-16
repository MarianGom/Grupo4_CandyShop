const {readFileSync, writeFileSync, readFile } = require('fs')
const { join } = require('path')

const model = {
    file: join(__dirname, '../data', 'usersDataBase.json'),
    findAll: () => JSON.parse(readFileSync(model.file, {encoding : 'utf-8'})),

    findOne: id => model.findAll().find(usuario => usuario.idUser == id), 

    create: (usuario) => {
       const allUsuarios = model.findAll();

       usuario.idUser = Date.now();

       allUsuarios.push(usuario);

       writeFileSync(model.file, JSON.stringify(allUsuarios, null, 2));
    }
 
}

module.exports = model