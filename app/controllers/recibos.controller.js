const Recibos = require("../models/recibos.model.js");

exports.create = (req, res) => {
  if(!req.body){
    res.status(400).send({
        message: "Conteudo não pode estar vazio!"
    });
  }
  const recibos = new Recibos({
    file_src: req.body.file_src
  });

  Recibos.create(recibos, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto tentavamos retornar os Recibos."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const file_src = req.query.file_src;
    Recibos.getAll(file_src, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto tentavamos retornar os Recibos."
        });
      else res.send(data);
    });
  };
  exports.findAllPublished = (req, res) => {
    Recibos.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto tentavamos retornar os Recibos."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Recibos.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Não encontrado o Recibos de id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro no retorno do Recibos de id " + req.params.id
            });
          }
        } else res.send(data);
      });
    };


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Conteúdo não pode ser vazio."
        });
      }
      console.log(req.body);
      Recibos.updateById(
        req.params.id,
        new Recibos(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Não encontrado o Recibos de id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Erro no atualização do Recibos de id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
    };

exports.delete = (req, res) => {
    Recibos.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Não encontrado o Recibos de id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro no deletar do Recibos de id " + req.params.id
            });
          }
        } else res.send({ message: `Recibos foi deletado com sucesso!` });
      });
    };

exports.deleteAll = (req, res) => {
    Recibos.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erro ao deletar todos os Recibos."
          });
        else res.send({ message: `Todos os Recibos foram deletados com sucesso!` });
      });
    };