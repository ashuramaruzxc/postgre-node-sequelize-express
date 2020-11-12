module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  let router = require("express").Router();
  //создать 
  router.post("/", tutorials.create);
  //найти все
  router.get("/", tutorials.findAll);
  //найти исключительно работающие
  router.get("/published", tutorials.findAllPublished);
  //найти одного по id
  router.get("/:id", tutorials.findOne);
  //обновить список
  router.put("/:id", tutorials.update);
  //удалить
  router.delete("/:id", tutorials.delete);
  //удалить весь список
  router.delete("/", tutorials.deleteAll);
  //использовать в postman 
  app.use("/api/tutorials", router);
};
