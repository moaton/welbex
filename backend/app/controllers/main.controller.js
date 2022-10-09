const db = require("../models");
const data = db.data;

const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
  try {
    response = await data.create({...req.body})
    if(response.dataValues){
      res.send({message: 'success'})
    }
  } catch (error) {
    res.status(500).send({message: 'error'})
  }
};
exports.findAll = async (req, res) => {
  try {
    let 
    column = req.query.column,
    query = req.query.query,
    condition = req.query.condition
    contains = {[Op.iLike]: `%${query}%`},
    equal = {[Op.eq]: query},
    greater = {[Op.gt]: query},
    less = {[Op.lt]: query},
    sorting = {
      name: req.query.name,
      quantity: req.query.quantity,
      distance: req.query.distance
    },
    params = {offset: req.query.skip, limit: req.query.take, order: [['id', 'DESC']], where: {}}

    if(sorting.name != '' || sorting.quantity != '' || sorting.distance != ''){
      params.order = []
      Object.entries(sorting).forEach(([key, value]) => {
        if(value != ''){
          params.order.push([key, value])
        }
      })
    }
    if(column !== '' && condition !== '' && query !== ''){
      switch (condition) {
        case 'equal':
          params.where[column] = equal
          break;
        case 'contains':
          params.where[column] = contains
          break;
        case 'greater':
          params.where[column] = greater
          break;
        case 'less':
          params.where[column] = less
          break;
      }
    }
    let total = await data.count(params)
    let items = await data.findAll(params)
    res.send({items: items, total})
  } catch (error) {
    res.status(500).send({items: [], total: 0})
  }
};
exports.findOne = async (req, res) => {

};
exports.update = async (req, res) => {
  try {
    await data.update({name: req.body.name, date: req.body.date, quantity: req.body.quantity, distance: req.body.distance}, {where: {id: req.body.id}})
    res.send({message: 'success'})
  } catch (error) {
    res.status(500).send({message: 'error'})
  }

};
exports.delete = async (req, res) => {
  try {
    await data.destroy({where: {id: req.params.id}})
    res.send({message: 'success'})
  } catch (error) {
    res.status(500).send({message: 'error'})
  }
};
exports.deleteAll = (req, res) => {
  
};