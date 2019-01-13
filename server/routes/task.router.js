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


taskRouter.get('/', (req,res) => {
    const queryText = 'SELECT * FROM "tasks" ORDER BY "id" ASC;'
    pool.query(queryText).then((result) => {
        res.send(result.rows);
        // console.log(result.rows);
        
    }).catch((error) => {
        console.log('error in GET', error);
        res.sendStatus(500); 
    })
})


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

taskRouter.delete('/:id', (req,res) => {
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1'
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in Put,', error);
        res.sendStatus(500);
    })
})







module.exports = taskRouter;