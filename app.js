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

//Mostrar todos los productos
app.get('/productos', (req,res) =>{
    connection.query('SELECT * FROM productos', (error, rows)=>{
        if(error){
            throw error;
        }else {
            res.send(rows);
        }
    });
});

//Mostrar un producto
app.get('/productos/:id', (req,res) =>{
    connection.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (error, row)=>{
        if(error){
            throw error;
        }else {
            res.send(row);
        }
    });
});

//Insertar un producto nuevo
app.post('/productos', (req, res)=>{
    let data = { codigo:req.body.codigo, descripcion:req.body.descripcion, stock:req.body.stock, precio:req.body.precio };
    let sql = 'INSERT INTO productos SET ?';
    connection.query(sql, data, (error, results)=>{
        if(error){
            throw error;
        }else {
            res.send(results);
        }
    });
});

//Editar un producto
app.put('/productos/:id', (req,res) =>{
    let id = req.params.id;
    let codigo = req.body.codigo;
    let descripcion = req.body.descripcion;
    let stock = req.body.stock;
    let precio = req.body.precio;
    
    let sql = 'UPDATE productos SET codigo = ?, descripcion = ?, stock = ?, precio = ? WHERE id = ?';
    connection.query(sql, [codigo, descripcion, stock, precio, id], (error, results)=>{
        if(error){
            throw error;
        }else {
            res.send(results);
            
        }
    });
});

//Eliminar un producto
app.delete('/productos/:id', (req, res)=>{
    connection.query('DELETE FROM productos WHERE id = ?', [req.params.id], (error, results)=>{
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
