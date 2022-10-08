module.exports = app => {
  const data = require("../controllers/main.controller.js");
  var router = require("express").Router();
  router.post("/", data.create);
  router.get("/", data.findAll);
  router.get("/:id", data.findOne);
  router.put("/:id", data.update);
  router.delete("/:id", data.delete);
  router.delete("/", data.deleteAll);
  app.use('/data', router);
};