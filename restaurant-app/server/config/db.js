const mongoose=require('mongoose');
module.exports=uri=>mongoose.connect(uri).then(()=>console.log('Mongo connected'));