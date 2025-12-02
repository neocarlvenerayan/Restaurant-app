const r=require('express').Router();
const c=require('../controllers/menuController');
r.post('/',c.create); r.get('/',c.all); r.get('/:id',c.one);
r.put('/:id',c.update); r.delete('/:id',c.del);
module.exports=r;