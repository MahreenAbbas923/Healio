const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://999mahreen_db_user:djjO0HRnG9LbPRWP@cluster0.quhkyen.mongodb.net/healio?retryWrites=true&w=majority&appName=Cluster0';

// Track connection state
let isConnected = false;

const connectDB = async () => {
  try {
    // Set mongoose options
    mongoose.set('strictQuery', false);
    
    // Connect to MongoDB - Mongoose 9.x handles options from connection string
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📊 Host: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    isConnected = true;
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`❌ Error Code: ${error.code || 'N/A'}`);
    if (error.code === 'ENOTFOUND') {
      console.error('💡 Check your internet connection');
    } else if (error.code === 'EAUTH') {
      console.error('💡 Check your MongoDB credentials');
    } else {
      console.error('💡 Make sure MongoDB Atlas is accessible and your IP is whitelisted');
    }
    isConnected = false;
    throw error;
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Mongoose connection error: ${err.message}`);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  // Only log if we were previously connected
  if (isConnected) {
    console.log('⚠️  Mongoose disconnected from MongoDB');
    isConnected = false;
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed through app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
