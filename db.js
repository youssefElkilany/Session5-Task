const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
let port = 5000
const app = express()
app.use(bodyparser.json())

//sql connection
//var sqlcon = mysql.createConnection()
var mysqlcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thecampsupermarketdb'
});

mysqlcon.connect((err) => {

    if (err) {
        //console.log("database connection failed")
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    }
    else {

        console.log("database connection succeded")
    }



})
//
//get products
app.get('/market/products', (req, res) => {
    mysqlcon.query('SELECT * FROM thecampmarket', (err, rows) => {
        if (err)
            console.log("gg")
        else
            res.send(rows)
        //console.log(rows)

    })
})

//add new products
app.post('/market/products', (req, res) => {
    mysqlcon.query('INSERT INTO thecampmarket SET ?', [req.body], (err, rows) => {

        if (err) {
            console.log("error at post request")
        }
        else {
            res.send("ADDED SUCCESSFULLY")
            console.log(rows)
        }
    })
})


//delete products
app.delete('/market/products/:id', (req, res) => {
    mysqlcon.query('DELETE FROM thecampmarket WHERE Id = ?', [req.params.id], (err, rows) => {
        if (err) {
            console.log("error at delete request")
        }
        else {
            res.send("deleted successfull")
        }
    })
})



//update
// app.put('/market/products', (req, res) => {
// //const x=req.body
//     const { Id, product_name, product_value, product_quantity,Value } = req.body
//    const squery= `UPDATE thecampmarket SET ${product_name}='${Value}, ${product_value}='${Value},${product_quantity}='${Value} ,' WHERE id=${Id};`;
    
//   //  mysqlcon.query('UPDATE thecampmarket SET ${product_name} = ?, product_value = ?,  product_quantity = ?,where Id = ?',
//   mysqlcon.query(squery,(err, rows) => {
//      // [x.product_name, x.product_value, x.product_quantity, x.Id], (err, rows) => {
//         if (err) {
//             console.log("error at put request")
//         }
//         else {
//             res.send("updated successfully")
//            // console.log(rows)
//         }
//     })
// })



app.put('/market/products', (req, res) => {


    const data= [req.body.product_name, req.body.product_value, req.body.product_quantity,req.body.Id ]
// let x = req.body
// const Id = x.id
// const product_name = x.product_name
// const product_quantity = x.product_quantity
// const product_value = x.product_value
//const record_date = x.record_date

mysqlcon.query('UPDATE thecampmarket SET product_name=?,product_value=?,product_quantity=?,WHERE id= ?',
//[product_name,product_value,product_quantity,Id],(err,result)=>{
data,(err,result)=>{ 
if(err)
{
    console.log("error at update request")
}
else
{
    res.send(result)
}


})
    
        })
    



//sold products
app.get('/market/sells', (req, res) => {
    mysqlcon.query('SELECT * FROM thecamp_market_sells', (err, rows) => {
        if (err)
            console.log("gg")
        else
            res.send(rows)
        //console.log(rows)

    })
})







app.listen(5000, () => {

    console.log(`server is running on ${port}`)
})