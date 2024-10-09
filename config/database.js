const mongoose = require('mongoose')
//connect

mongoose.connect('mongodb://localhost:27017/userDB')

//schema
const userSchema = new mongoose.Schema({
    username:  String,
    password:  String,
});
//model

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;

//exporting the User model for use in other files.
// This is a common practice in Node.js.
// The model can be used to interact with the MongoDB database.
// This model can be used to create new users, find users by username, etc.
// The schema defines the structure of the user data.
// The model is a wrapper around the schema and provides methods for interacting with the data.
// The 'User' in this case is the name of the model.
// The first argument to the mongoose.model function is the name of the model, and the second argument is the schema.
// The schema defines the structure of the data that will be stored in the database.
// The model provides methods for interacting with the data, such as creating new users, finding users by username, etc.
// The 'User' in this case is the name of the model.
