const express = require("express");
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));



// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-6117189399019398-120220-b652cb60d6f3795955dd7ad49fe98a5e-1031166001",
});

// app.get("http://localhost:19006", (req, res) =>{
//   res.send("http://localhost:19006")
// })

const quantity = 4
const unitePrice = 1000

app.post('/checkout', (req, res) => {
  let preference = {
    external_reference: '1234567890',
              items:[{
                   title: 'Lugar reservado',
                   quantity: quantity,
                   unit_price: unitePrice,
                   currency_id:'ARG'
                  }],
    back_urls: {
      success: 'http://localhost:19006/success',
      failure: 'http://localhost:19006/cancel'
    },
    auto_return: 'approved',
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      res.send(response.body.sandbox_init_point);

    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/success', (req, res) => {
  // console.log('QUERYYYYY', req.query)
  // console.log('PARAMSSSS', req.params)
  // console.log('BODYYYYYY', req.body);
  res.send('Approved')
})

app.get('/cancel', (req, res) => {
  res.send('Cancel')
})
app.get('/payment', (req, res) => {
  const id = req.body.id;

})

app.listen(process.env.PORT || 19006, () => {

  console.log("Server Running");

})