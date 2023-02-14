// In this file we are going to define our prisma client which is used to interact with our database via prisma 

import { PrismaClient } from "@prisma/client";

let db:PrismaClient;

declare global{
    var __db: PrismaClient | undefined

}

//Everytime we reload our application as we are using a kind of hot reloader so we dont keep restaating our server a new prisma client will be created and we dont want 10 or more connection to our databases we want just one this will chck to see if prisma client already exist otherwise create a new one

if(!global.__db)
{
    global.__db = new PrismaClient();
}

db = global.__db;

export {db};