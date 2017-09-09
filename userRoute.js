const express = require('express');

const route = express.Router();

route.use((req, res, next) => {
    next();
});

route.get('/', (req, res) => res.send('Ban dang xem sach'));

module.exports = route;
