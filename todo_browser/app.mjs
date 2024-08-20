import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


import { db } from './data/database.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

db.connect();

app.get("/", function(request, response){
  response.redirect("/-1");
})

app.get("/delete-list/:target/:current_list", function(request, response) {
  const current_list = request.params.current_list;
  const target = request.params.target;
  db.query(`DELETE FROM lists WHERE id=${target}`, function(error, results, fields) {
    db.query(`DELETE FROM items WHERE list_id=${target}`, function(error, results, fields) {
      response.redirect(`/${current_list}`);
    });
  });
});

app.get("/delete-task/:target/:current_list", function(request, response) {
  const current_list = request.params.current_list;
  const target = request.params.target;
  db.query(`DELETE FROM items WHERE id=${target} AND list_id=${current_list}`, function(error, results, fields) {
    response.redirect(`/${current_list}`);
  });
});

app.get("/new-list/:current_list", function(request, response){
  const current_list = request.params.current_list;
  db.query("INSERT INTO lists (name, done) VALUES ('New List', false)", function(error, results, fields) {
    response.redirect(`/${current_list}`);
  });
});

app.get("/new-task/:current_list", function(request, response){
  const current_list = request.params.current_list;
  db.query(`INSERT INTO items (description, done, list_id) VALUES ('New Task', false, ${current_list})`, function(error, results, fields) {
    response.redirect(`/${current_list}`);
  });
});

app.get("/toggle-done/:list_id/:task_id", function(request, response) {
  const list_id = request.params.list_id;
  const task_id = request.params.task_id;
  db.query(`SELECT * FROM items WHERE list_id=${list_id}`, function(error, results, fields) {
    console.log(results, task_id, results[task_id]);
    const done = results.find(task => task.id == task_id).done;
    let taskDone;
    if (done == 0) {
      taskDone = 1;
    } else {
      taskDone = 0;
    }
    results.find(task => task.id == task_id).done = taskDone;
    let listDone = 1;
    for (const result of results) {
      if (result.done == 0) {
        listDone = 0;
        break;
      }
    }
    db.query(`UPDATE items SET done=${taskDone} WHERE id=${task_id} AND list_id=${list_id}`, function(e, r, f){
      db.query(`UPDATE lists SET done=${listDone} WHERE id=${list_id}`, function(e, r, f){
        response.redirect(`/${list_id}`);
      });
    });
  });
});

app.get("/:chosen_list", async function(request, response) {
  let chosen_list = request.params.chosen_list;
  if (chosen_list == "null") {
    chosen_list = -1;
  }
  db.query(`SELECT * FROM items WHERE list_id=${chosen_list}`, function (error, tasks, fields) {
    db.query("SELECT * FROM lists", function(error, lists, fields) {
      let title = "Choose a List";
      for (const list of lists) {
        list.list_id = list.id;
        list.task_id = "";
        list.label = list.name;
        if (chosen_list == list.id) {
          title = list.name;
        }
      }
      for (const task of tasks) {
        task.task_id = task.id;
        task.label = task.description;
      }
      response.render("index", {title: title, lists: lists, tasks: tasks, chosen_list: chosen_list});
    })
  });
});


app.listen(3000);
