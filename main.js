const sqlite3 = require('sqlite3')
const express = require('express')
const port = 3000

const app = express()

const db = new sqlite3.Database('main.db')
db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, post TEXT)")


function seed(){
    for(let i = 0; i < 10; i++){
        db.run("INSERT INTO posts (title, post) VALUES (?,?)", `title${i}`, `post${i}`, function(err) {
            if (err) {
              return err.message;
            }
          }
        )	
    }
    return "seeding done"
}

app.post("/seed", (req, res)=>{
    const result = seed()
    res.send(JSON.stringify({status: result}))
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})