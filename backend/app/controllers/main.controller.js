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
    res.status(500).send(error)
  }
};
exports.findAll = async (req, res) => {
  try {
    let items = await data.findAll()
    res.send({items: items.sort((a, b) => a.id < b.id ? 1 : -1), total: items.length})
  } catch (error) {
    res.status(500).send(error)
  }
};
exports.findOne = async (req, res) => {

};
exports.update = async (req, res) => {

};
exports.delete = async (req, res) => {
  try {
    await data.destroy({where: {id: req.params.id}})
    res.send({message: 'success'})
  } catch (error) {
    res.status(500).send(error)
  }
};
exports.deleteAll = (req, res) => {
  
};