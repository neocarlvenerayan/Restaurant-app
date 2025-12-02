const m=require('mongoose');
module.exports=m.model('MenuItem',new m.Schema({
 name:String, description:String, price:Number, category:String, imageUrl:String
},{timestamps:true}));