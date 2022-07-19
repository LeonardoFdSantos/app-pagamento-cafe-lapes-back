const sql = require('./db.js');

// abrir construtor
const Cafezinho = function(cafezinho){
    this.Pessoa = cafezinho.Pessoa;
    this.DataPagamento = cafezinho.DataPagamento;
    this.ValorPagamento = cafezinho.ValorPagamento;
    this.FormaPagamento = cafezinho.FormaPagamento;
    this.IdReciboPagamento = cafezinho.IdReciboPagamento;
};

Cafezinho.create = (newCafezinho, result) => {
    sql.query("INSERT INTO CAIXINHA_CAFE SET ?", newCafezinho, (err, res)=> {
        if (err){
            console.log("erro: ", err);
            result(err, null);
            return;
        }
        console.log("Cafezinho Criado: ", {id: res.insertId, ...newCafezinho });
        result(null, {id: res.insertId, ...newCafezinho});
    });
};

Cafezinho.findById = (id, result) => {
    sql.query(`SELECT * FROM CAIXINHA_CAFE WHERE id = ${id}`, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("Cafezinho encontrado: ", res[0]);
            result(null, res[0]);
            return;
          }
          result({ kind: "NAO_ENCONTRADO_PORRA" }, null);
    });
};

Cafezinho.getAll = (Pessoa, result) => {
    let query = "SELECT * FROM CAIXINHA_CAFE";
  if (Pessoa) {
    query += ` WHERE Pessoa LIKE '%${Pessoa}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    console.log("Cafezinho: ", res);
    result(null, res);
  });
};

Cafezinho.updateById = (id, cafezinho, result) => {
    sql.query(
      "UPDATE CAIXINHA_CAFE SET Pessoa = ?, DataPagamento = ?, ValorPagamento = ?, FormaPagamento = ?, IdReciboPagamento = ? WHERE id = ?",
      [cafezinho.Pessoa, cafezinho.DataPagamento, cafezinho.ValorPagamento, cafezinho.FormaPagamento, cafezinho.IdReciboPagamento,  id],
      (err, res) => {
        if (err) {
          console.log("erro: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "NAO_ENCONTRADO_PORRA" }, null);
          return;
        }
        console.log("Cafezinho Atualizado: ", { id: id, ...cafezinho });
        result(null, { id: id, ...cafezinho });
      }
    );
};

Cafezinho.remove = (id, result) => {
    sql.query("DELETE FROM CAIXINHA_CAFE WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "NAO_ENCONTRADO_PORRA" }, null);
        return;
      }
      console.log("Deletado o Cafezinho de id: ", id);
      result(null, res);
    });
};

Cafezinho.removeAll = result => {
    sql.query("DELETE FROM CAIXINHA_CAFE", (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        return;
      }
      console.log(`Deletado ${res.affectedRows} Cafezinhos`);
      result(null, res);
    });
};

module.exports = Cafezinho;