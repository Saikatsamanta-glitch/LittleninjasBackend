const express = require('express');
const app = express();
const port = 5000 | process.env.PORT;
const cors = require('cors');

app.use(cors());

const sql = require('mssql');

const config = {
  user: 'admin',
  password: 'Littleninjas123',
  server: 'littleninjas-courses.c2cg4vgpvgwa.eu-north-1.rds.amazonaws.com',
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
        request.query(`SELECT *  from courses join levels on courses.course_id =${courseId};
        `)
          .then((result) => {
            res.json(result.recordset);
          })
          .catch((err) => {
            res.json('Error executing query:', err);
          });
})

app.listen( port, ()=>{

} )