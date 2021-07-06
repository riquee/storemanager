const express = require('express');
const products = require('./controllers/Products');
const sales = require('./controllers/Sales');
const { errorMiddleware } = require('./middleware');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();  
});

app.use('/products', products);
app.use('/sales', sales);

app.use(errorMiddleware);


app.listen(port, () => console.log(`Connection PORT: ${port}`));
