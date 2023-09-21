const express = require('express');
const app = express();
const port = 5000 | process.env.PORT;
const cors = require('cors');
const env = require('dotenv')
env.config();
app.use(cors());

const sql = require('mssql');

const config = {
  user: 'admin',
  password: 'Littleninjas123',
  server: process.env.CONN_STRING,
  database: 'littleninjas',
  options: {
    encrypt: true, // Use this for encrypted connections,
    trustServerCertificate: true,
    IntegratedSecurity: false,
  },
  ssl: true,
};



app.get('/courses',async(req,res)=>{
        const pool =await sql.connect(config);
        const request = pool.request();
        request.query('SELECT * FROM courses ')
          .then((result) => {
            res.json(result.recordset);
          })
          .catch((err) => {
            res.json('Error executing query:', err);
          });
      
})

app.get('/courses/:courseId',async(req,res)=>{
        const courseId = req.params.courseId;
        const pool =await sql.connect(config);
        const request = pool.request();
        request.query(`SELECT *  from courses left join levels on courses.course_id = levels.course_id where courses.course_id =${courseId};
        `)
          .then((result) => {
            res.json(result.recordset);
          })
          .catch((err) => {
            res.json('Error executing query:', err);
          });
})

app.listen( port, ()=>{
        console.log("Connected server");
} )