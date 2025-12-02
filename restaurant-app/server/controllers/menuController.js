const Menu=require('../models/MenuItem');
exports.create=async(r,s)=>s.json(await Menu.create(r.body));
exports.all=async(r,s)=>s.json(await Menu.find());
exports.one=async(r,s)=>s.json(await Menu.findById(r.params.id));
exports.update=async(r,s)=>s.json(await Menu.findByIdAndUpdate(r.params.id,r.body,{new:true}));
exports.del=async(r,s)=>{await Menu.findByIdAndDelete(r.params.id);s.json({msg:'deleted'});}