const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pranitha@123",
    database:"bookmanagement"
});

db.connect((err)=>{
    if(err) console.log(err);
    else console.log("MySQL Connected");
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"));
});

app.post("/addbook",(req,res)=>{
    const {title,author,category,price,stock}=req.body;
    db.query(
        "INSERT INTO books(title,author,category,price,stock) VALUES(?,?,?,?,?)",
        [title,author,category,price,stock],
        (err)=> res.send(err || "Book Added Successfully")
    );
});

app.get("/books",(req,res)=>{
    db.query("SELECT * FROM books",(err,result)=>{
        res.json(result);
    });
});

app.put("/update/:id",(req,res)=>{
    const {title,author,category,price,stock}=req.body;
    db.query(
        "UPDATE books SET title=?,author=?,category=?,price=?,stock=? WHERE book_id=?",
        [title,author,category,price,stock,req.params.id],
        (err)=> res.send(err || "Book Updated")
    );
});

app.delete("/delete/:id",(req,res)=>{
    db.query(
        "DELETE FROM books WHERE book_id=?",
        [req.params.id],
        (err)=> res.send(err || "Book Deleted")
    );
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
