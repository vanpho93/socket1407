const express = require('express');

const route = express.Router();

route.get('/', (req, res) => res.send('Ban dang xem sach'));

module.exports = route;
