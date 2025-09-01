// unimarket-backend/seedBusinesses.js
const mongoose = require('mongoose');
const Business = require('./models/Business');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Business.deleteMany(); // clear old

    await Business.insertMany([
      {
        name: 'D-Kampung Coffee',
        category: 'Coffee',
        description: 'Freshly brewed coffee.',
        location: 'AIU Cafeteria',
        image: 'https://via.placeholder.com/150',
        rating: 4.5,
        products: [
          { name: 'Espresso', price: 5, image: '', description: 'Strong coffee shot' },
          { name: 'Latte', price: 7, image: '', description: 'Milk coffee' }
        ]
      },
      {
        name: 'AIU Tailoring Shop',
        category: 'Tailoring',
        description: 'Custom tailoring & repairs.',
        location: 'Block B',
        image: 'https://via.placeholder.com/150',
        rating: 4.2,
        products: [
          { name: 'Pants Repair', price: 10, image: '', description: 'Fix torn pants' }
        ]
      }
    ]);

    console.log('✅ Seeded businesses!');
    process.exit();
  })
  .catch(err => console.error('❌', err));
