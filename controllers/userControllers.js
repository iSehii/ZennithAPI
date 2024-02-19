const index = (req, res) => {
    console.log('index usersControllers');
    res.send('respuesta desde controlador');
};


module.exports = {
    index
};