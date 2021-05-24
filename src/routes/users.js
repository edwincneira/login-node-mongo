const express = require('express');
const router = express.Router();

router.get('/users/sigin', (req, res) => {
    res.send('Ingresando a la app');
});

router.get('/users/signup', (req, res) => {
    res.send('Registrando en la app');
})

module.exports = router;