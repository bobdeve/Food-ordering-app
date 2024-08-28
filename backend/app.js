import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT'); // Include PUT
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET endpoint to fetch meals
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch meals', error: error.message });
  }
});


app.get('/fetchorder', async (req, res) => {
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    res.json(JSON.parse(orders));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

app.put('/updateorder', async (req, res) => {
  try {
    // Write an empty array to the orders.json file to clear all orders
    await fs.writeFile('./data/orders.json', JSON.stringify([]));
    // Respond with a success message
    res.status(200).json({ message: 'All orders updated (cleared) successfully' });
  } catch (error) {
    // Respond with an error message if something goes wrong
    res.status(500).json({ message: 'Failed to update orders', error: error.message });
  }
});


// POST endpoint to create a new order
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    !orderData.customer.email || !orderData.customer.email.includes('@') ||
    !orderData.customer.name || orderData.customer.name.trim() === '' ||
    !orderData.customer.street || orderData.customer.street.trim() === '' ||
    !orderData.customer['postal-code'] || orderData.customer['postal-code'].trim() === '' ||
    !orderData.customer.city || orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  try {
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Catch-all handler for undefined routes
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
