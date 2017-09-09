const express = require('express');

const bookRoute = require('./bookRoute');
const userRoute = require('./userRoute');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/book', bookRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => res.send('aaa'));
app.listen(3000, () => console.log('Server started!'));
