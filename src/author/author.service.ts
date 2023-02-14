/* 
thos service file is our way of communicating with db
*/
import {db} from "../utils/db.server"

//we could just emit thos from our author that we define in our model but it makes it much cleaner to read 
export type Author = {
    id:number;
    firstName : string;
    lastName :string;
};

/*
Function that list out the author
As we are communcating with our prisma client it will return a promise
*/
export const listAuthors = async ():Promise<Author[]> =>{
return db.author.findMany({
   select :{
    id : true,
    firstName:true,
    lastName:true,
   }
})
}

export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
      where: {
        id,
      },
    });
  };

  export const createAuthor = async(author : Omit<Author,"id">):Promise<Author> =>{
    const {firstName,lastName} = author

    return db.author.create({
      data:{
        firstName,
        lastName,
      },
      select:{
        id : true,
        firstName:true,
        lastName:true,
      }
    })
  }

  export const updateAuthor = async (author:Omit<Author,"id">, id: number) : Promise<Author> =>{
   const {firstName,lastName} = author;
   return db.author.update({
    where: {
      id,
    },
    data:{
      firstName,
      lastName,
    },
    select:{
      id:true,
      firstName:true,
      lastName:true,
    },
   })
  }

  export const deleteAuthor = async (id: number): Promise<void> => {
    await db.author.delete({
      where: {
        id,
      },
    });
  };