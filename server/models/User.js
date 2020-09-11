const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Unique email for each user
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    // User Image
    type: String,
  },
  role: {
    // Role of user it will be (normal or admin )
    type: Number,
    default: 0,
  },
  history: {
    // order history
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model('User', UserSchema )






























// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required:true,
//         trim:true,
//         min:3,
//         max:20
//     },
//     lastName:{
//         type:String,
//         required:true,
//         trim:true,
//         min:3,
//         max:20
//     },
//     username:{
//         type:String,
//         required:true,
//         trim:true,
//         unique:true,
//         index:true,
//         min:3,
//         max:20
//     },
//     email:{
//         type:String,
//         required:true,
//         lowercase:true,
//         trim:true
//     },
//     hash_password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['user','admin'],
//         default:'user'
//     },
//     contactNumber:{type:String},
//     profilePicture:{type:String}
// },{timestamps:true})



// //Virtuals here
// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password,10)
// })

// userSchema.virtual('fullName')
// .get(function(){
//     return `${this.firstName} ${this.lastName}`
// })

// userSchema.methods = {
//     authenticate:function(password){
//         return bcrypt.compareSync(password,this.hash_password)  //returns true or false
       
//     }
// }

// module.exports = mongoose.model('User',userSchema)