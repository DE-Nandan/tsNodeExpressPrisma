// function to load default data into our database that way we dont have to keep on adding data into our database everytime we reset it 

// this module loads data into our database

import {db} from "../src/utils/db.server"

//creating types

// we are creating type of fname and lastname only because other attributes are automatically handled by db so we are concenred  here about it only 
type Author = {
    firstName : string;
    lastName :string;
};
type Book = {
    title : string;
    isFiction :boolean;
    datePublished:Date;
};

async function seed() {
 await Promise.all(
    getAuthors().map((author) =>{
        // thos is where we get first taste of our prisma cleint
        return db.author.create({
            data :{
                firstName:author.firstName,
                lastName:author.lastName
            }
        })
    })
 );

 const author = await db.author.findFirst({
    where: {
      firstName: "Yuval Noah",
    },
  });

  if(author != null)
  {
  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      });
    })
  );
}

}

seed();

// fucntion returns an array of authors
function getAuthors() : Array<Author>{
    return [
        {
        firstName:"Jhon",
        lastName:"Doe"
        },
        {
        firstName:"William",
        lastName:"Shakespeare"
        },
        {
        firstName:"Yuval Noah",
        lastName:"Harari"
        }
]
}

function getBooks() : Array<Book>{
    return [
        {
        title:"Sapiens",
        isFiction : false,
        datePublished : new Date(),
        },
        {
        title:"Homo Deus",
        isFiction : false,
        datePublished : new Date(),
        },
        {
        title:"The Ugly Duckling",
        isFiction : true,
        datePublished : new Date(),
        },    
]
}