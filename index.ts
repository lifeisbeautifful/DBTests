import express from "express";
import mysql from "mysql";
import {load} from "ts-dotenv";

const env = load({
    HOST:String,
    USERNAME:String,
    PASSWORD:String,
    DATABASE:String,
    PORT:Number
})

const app = express();

app.use(express.json());

let pool = mysql.createPool({
    host:"yh6.h.filess.io",
    user: "automation_heraction",
    password: "a15e5a47817c45a99ca9f32298e1cca90ea3c056",
    database: "automation_heraction",
    port:3306
});

let users = [
    {
        id: 1,
        name: "UserOne"
    },
    {
        id:2,
        name: "UserTwo"
    }
];

app.get("/users", (req, res) => {
    pool.getConnection(function(error, connection){
        connection.query(`Select * from users`, function(error, result, fields){
            if(error) throw error;
            res.json(result);
            console.log(result);
        })
    })
});
    

app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    pool.getConnection(function(error, connection){
        connection.query(`Select * from users where id = ${id}`, function(error, result,fields){
            if(error)throw error;
            res.json(result)
            console.log(result);
        })
    })
})


app.post("/users", (req, res) => {
    const {username, email, password} = req.body;
    pool.getConnection(function(error, connection){
        connection.query(`Insert into users(username, email, password) values('${username}', '${email}', '${password}')`,
        function(error, result, fields){
            if(error)throw error;
            res.json(result)
            console.log(result);
        })
    })
})

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    pool.getConnection(function(error, connection){
        connection.query(`Delete from users where id = ${id}`, function(error, result, fields){
            if(error)throw error;
            res.json(result)
            console.log(result);
        })
    })
})

app.listen(env.PORT, () => {
    console.log("Listening on port")
})