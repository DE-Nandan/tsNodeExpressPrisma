import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


import {authorRouter} from "./author/author.router"
import {bookRouter} from "./book/book.router"

dotenv.config();
// console.log(process.env);
if(!process.env.PORT)
{    
     process.exit(1)
}

const PORT : number = parseInt(process.env.PORT as string,10) || 8745;
console.log(PORT);

const app = express();

/* 
About cors:
https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
*/
app.use(cors());

// we want our app to use json for that
app.use(express.json());

app.use('/api/authors',authorRouter);
app.use('/api/books',bookRouter);

app.listen(PORT, () =>{
    console.log(`Listening on PORT ${PORT} `);
})