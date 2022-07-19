module.exports = app => {
    const cafezinho = require("../controllers/lapes.controller.js");
    var router = require("express").Router();
    router.post("/", cafezinho.create);
    router.get("/", cafezinho.findAll);
    router.get("/:id", cafezinho.findOne);
    router.put("/:id", cafezinho.update);
    router.delete("/:id", cafezinho.delete);
    router.delete("/", cafezinho.deleteAll);
    app.use('/api/cafezinho', router);
  };