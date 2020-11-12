const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
//создает новый объект в БД
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Поле не может пустым!"
    });
    return;
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Произошла ошибка при создании user."
      });
    });
};
//показывает всех через get 
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Произошла ошибка при получении данных tutorials."
      });
    });
};
//поиск по id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: " Tutorial c id=" + id
      });
    });
};
//обновление по id
exports.update = (req, res) => {
  const id = req.params.id;
  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial был обновлен."
        });
      } else {
        res.send({
          message: `Невозможно обновить Tutorial с id=${id}.Возможно tutorial был неправильный или req.body пустой!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ошибка обновления user с id=" + id
      });
    });
};
//удалить 
exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial был успешно удален!"
        });
      } else {
        res.send({
          message: `Невозможно удалить Tutorial с id=${id}. Возможно Tutorial не был найден!`/*Если выбивает второй вариант нужно использовать
          в server.js db.sequelize.sync() перед app.get("/", (req, res)
          */
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Невозможно удалить Tutorial с id=" + id
      });
    });
};
//удалить все
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials были успешно удалены!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Произошла какая-то ошибка во-время удаления Tutorials"
      });
    });
};
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Произошла ошибка при получении данных Tutorials"
      });
    });
};
