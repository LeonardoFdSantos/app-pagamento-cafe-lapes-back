const sql = require('./db.js');

// abrir construtor
const Recibo = function(recibo){
    this.file_src = recibo.file_src;
};

Recibo.create = (newRecibo, result) => {
    sql.query("INSERT INTO RECIBOS_CAIXINHA SET ?", newRecibo, (err, res)=> {
        if (err){
            console.log("erro: ", err);
            result(err, null);
            return;
        }
        console.log("Recibo Criado: ", {id: res.insertId, ...newRecibo });
        result(null, {id: res.insertId, ...newRecibo});
    });
};

Recibo.findById = (id, result) => {
    sql.query(`SELECT * FROM RECIBOS_CAIXINHA WHERE id = ${id}`, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("Recibo encontrado: ", res[0]);
            result(null, res[0]);
            return;
          }
          result({ kind: "NAO_ENCONTRADO_PORRA" }, null);
    });
};

Recibo.getAll = (Arquivo, result) => {
    let query = "SELECT * FROM RECIBOS_CAIXINHA";
  if (Arquivo) {
    query += ` WHERE file_src LIKE '%${Arquivo}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    console.log("Recibo: ", res);
    result(null, res);
  });
};

Recibo.updateById = (id, recibo, result) => {
    sql.query(
      "UPDATE RECIBOS_CAIXINHA SET file_src = ? WHERE id = ?",
      [recibo.file_src, id],
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
        console.log("Recibo Atualizado: ", { id: id, ...Recibo });
        result(null, { id: id, ...Recibo });
      }
    );
};

Recibo.remove = (id, result) => {
    sql.query("DELETE FROM RECIBOS_CAIXINHA WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "NAO_ENCONTRADO_PORRA" }, null);
        return;
      }
      console.log("Deletado o Recibo de id: ", id);
      result(null, res);
    });
};

Recibo.removeAll = result => {
    sql.query("DELETE FROM RECIBOS_CAIXINHA", (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        return;
      }
      console.log(`Deletado ${res.affectedRows} Recibos`);
      result(null, res);
    });
};

module.exports = Recibo;