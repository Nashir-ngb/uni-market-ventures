// unimarket-backend/seedProducts.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/unimarket', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected');

    await Product.deleteMany();

    await Product.insertMany([
      { name: 'D-Kampung Latte', price: 8, description: 'Specialty latte from D-Kampung Coffee', category: 'Coffee', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'AIU Tailoring Shirt', price: 50, description: 'Custom tailored shirt', category: 'Tailoring', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'AIU Salon Haircut', price: 20, description: 'Professional haircut service', category: 'Salon', imageUrl: 'https://via.placeholder.com/150' }
    ]);

    console.log('✅ Products seeded');
    process.exit();
  })
  .catch(err => console.error(err));
