const express = require('express');
const taskRouter = express.Router();


// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

// gets what is on table and sends to client
taskRouter.get('/', (req,res) => {
    const queryText = 'SELECT * FROM "tasks" ORDER BY "task_completed" ASC, "id" ASC;'
    pool.query(queryText).then((result) => {
        res.send(result.rows);
        // console.log(result.rows);
        
    }).catch((error) => {
        console.log('error in GET', error);
        res.sendStatus(500); 
    })
})

// posts to db talbe
taskRouter.post('/', (req,res) => {
    
    const queryText = `INSERT INTO "tasks" ("todo_item", "task_completed") 
                       VALUES ($1, $2);`
    pool.query(queryText, [req.body.todo_item, req.body.task_completed]).then((result) => {
        res.sendStatus(200);
        
    }).catch((error) => {
        console.log('error in POST, ', error);
        res.sendStatus(500);
    })
})

// deletes specified row from table
taskRouter.delete('/:id', (req,res) => {
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1'
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in Put,', error);
        res.sendStatus(500);
    })
})

// updates specified row
taskRouter.put('/update/:id', (req,res) => {
    const queryText = `UPDATE "tasks" SET "task_completed" = 'true'
                       WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in PUT: ', error);
        res.sendStatus(500);
    })
})







module.exports = taskRouter;