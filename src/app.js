/*const fs = require('fs');
const express = require('express');
const app = express();
//Aim: With the help of router, get all the product with router.GET request and create a product with router.POST request

//middleware
//write router middleware here

//Including product.json file
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Get all the products
router.get('/api/v1/product', (req, res) => {
  try {
    //Write your code here
  } catch (error) {
    res.status(400).json(error);
  }
});

//Create a new Product
router.post('/api/v1/product', (req, res) => {
  try {
    //Write your code here
  } catch (error) {
    res.status(400).json(error);
  }
});

//Registering our Router
//Write here to register router

module.exports = app;
*/

const express = require('express');
const fs = require('fs');
const router = express.Router();

const products = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/product.json`));

router.get('/api/v1/product', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        product: products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.post('/api/v1/product', (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price) {
      //throw new Error('Title and price are required');
      req.status(404).json({
        status:'Error',
        message:'Title and price are required',
      });
    }
    const newProduct = {
      id: products.length + 1,
      title,
      price,
    };
    products.push(newProduct);
    fs.writeFile(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(products),
      (err) => {
        if (err){ 
          //throw new Error('Error creating product');
          req.status(400).json({
            status:'Error',
            message:'Error creating product',
            });
        }
        res.status(201).json({
          status: 'success',
          data: {
            product: newProduct,
          },
        });
      }
    );
  } 
  catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
});

const app = express();
app.use(express.json());
app.use(router);

module.exports = app;
