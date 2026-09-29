const mongoose = require('mongoose');
const { modelName } = require('../models/post.model');

async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Server is running on port 3000')
}

module.exports = connectDB