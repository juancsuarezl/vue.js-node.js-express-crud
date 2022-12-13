const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const swal = require('sweetalert2');


const app = express();
app.use(express.json());
app.use(cors());

//Creamos la conexión con la base de datos MySQL
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });

  //Establecemos la conexión 
  connection.connect((error) => {
      if(error){
          throw error;
      }else {
          console.log('Successful connection to DB');
      }
  });

//Creamos las rutas para nuestra API
//Ruta de inicio de la app
app.get('/', (req, res) => {
    res.send('Welcome to my app!')
});

//Mostrar todos los clientes
app.get('/clientes', (req,res) =>{
    connection.query('SELECT * FROM clientes', (error, rows)=>{
        if(error){
            throw error;
        }else {
            res.send(rows);
        }
    });
});

//Mostrar un cliente
app.get('/clientes/:id', (req,res) =>{
    connection.query('SELECT * FROM clientes WHERE id = ?', [req.params.id], (error, row)=>{
        if(error){
            throw error;
        }else {
            res.send(row);
        }
    });
});

//Insertar un cliente nuevo
app.post('/clientes', (req, res)=>{
    let data = { name:req.body.name, address:req.body.address, phone:req.body.phone, email:req.body.email, payDay:req.body.payDay };
    let sql = 'INSERT INTO clientes SET ?';
    connection.query(sql, data, (error, results)=>{
        if(error){
            throw error;
        }else {
            res.send(results);
        }
    });
});

//Editar un cliente
app.put('/clientes/:id', (req,res) =>{
    let id = req.params.id;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let email = req.body.email;
    let payDay = req.body.payDay;
    
    let sql = 'UPDATE clientes SET name = ?, address = ?, phone = ?, email = ?, payDay = ? WHERE id = ?';
    connection.query(sql, [name, address, phone, email, payDay, id], (error, results)=>{
        if(error){
            throw error;
        }else {
            res.send(results);
        }
    });
});

//Eliminar un cliente
app.delete('/clientes/:id', (req, res)=>{
    connection.query('DELETE FROM clientes WHERE id = ?', [req.params.id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

app.listen('3000', () => {
    console.log('Server running on port 3000');
})
