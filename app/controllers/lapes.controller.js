const Cafezinho = require("../models/lapes.model.js");
exports.create = (req, res) => {
  if(!req.body){
    res.status(400).send({
        message: "Conteudo não pode estar vazio!"
    });
  }
  const cafezinho = new Cafezinho({
    Pessoa: req.body.Pessoa,
    DataPagamento: req.body.DataPagamento,
    ValorPagamento: req.body.ValorPagamento,
    FormaPagamento: req.body.FormaPagamento,
    IdReciboPagamento: req.body.IdReciboPagamento
  });

  Cafezinho.create(cafezinho, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto tentavamos retornar os CAFEZINHOS."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const Pessoa = req.query.Pessoa;
    Cafezinho.getAll(Pessoa, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto tentavamos retornar os CAFEZINHOS."
        });
      else res.send(data);
    });
  };
  exports.findAllPublished = (req, res) => {
    Cafezinho.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto tentavamos retornar os CAFEZINHOS."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Cafezinho.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Não encontrado o Cafezinho de id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro no retorno do Cafezinho de id " + req.params.id
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
      Cafezinho.updateById(
        req.params.id,
        new Cafezinho(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Não encontrado o Cafezinho de id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Erro no atualização do Cafezinho de id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
    };

exports.delete = (req, res) => {
    Cafezinho.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Não encontrado o Cafezinho de id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro no deletar do Cafezinho de id " + req.params.id
            });
          }
        } else res.send({ message: `Cafezinho foi deletado com sucesso!` });
      });
    };

exports.deleteAll = (req, res) => {
    Cafezinho.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Erro ao deletar todos os Cafezinho."
          });
        else res.send({ message: `Todos os Cafezinhos foram deletados com sucesso!` });
      });
    };