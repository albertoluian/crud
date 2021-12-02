(async () => {
    const database = require('./db');
    const Usuario = require('./models/usuario');
    const Carro = require('./models/carro');
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();