module.exports = app => {
    const recibo = require("../controllers/recibos.controller.js");
    var router = require("express").Router();
    router.post("/", recibo.create);
    router.get("/", recibo.findAll);
    router.get("/:id", recibo.findOne);
    router.put("/:id", recibo.update);
    router.delete("/:id", recibo.delete);
    router.delete("/", recibo.deleteAll);
    app.use('/api/recibo', router);
  };