import express from 'express';
import type {Request,Response} from 'express';
import {body,validationResult} from 'express-validator';
import * as AuthorService from './author.service'

export const authorRouter = express.Router();

// Get a list of Authors

authorRouter.get('/',async(req:Request,res:Response) =>{
    try{
        
        const authors = await AuthorService.listAuthors();
        return res.status(200).json(authors);
    }
    catch(error : any){
                 return res.status(500).json(error.message);
    }
})

//get a single author by id

authorRouter.get('/:id' , async(req : Request,res : Response) =>{
    const id : number = parseInt(req.params.id,10);
    try{
      const author = await AuthorService.getAuthor(id);
      if(author){
        return res.status(200).json(author);
      }
      return res.status(404).json("Author not found");
    }
    catch(error :any){
        return res.status(500).json(error.message);
    }
})

// POSTR create a author
// Paramas : firstName and lastName

authorRouter.post('/',body("firstName").isString(),body("lastName").isString() , async(req:Request,res:Response) =>{
  const error  =validationResult(req);
  if(!error.isEmpty())
  {
    return res.status(400).json({errors : error.array()});
  }

  try{
    const author = req.body;
    const newAuthor = await AuthorService.createAuthor(author);
     return res.status(201).json(newAuthor);
  }
  catch(error:any){
    return res.status(500).json(error.message);
  }

})

// PUT updating a author
// Paramas : firstName and lastName

authorRouter.put("/:id",body("firstName").isString(),body("lastName").isString(), async(req:Request,res:Response) =>{
  const error  =validationResult(req);
  if(!error.isEmpty())
  {
    return res.status(400).json({errors : error.array()});
  }
  const id:number = parseInt(req.params.id,10);
  try{
    const author = req.body
    const updatedAuthor = await AuthorService.updateAuthor(author,id)
    return res.status(200).json(updatedAuthor);
  }
  catch(error:any)
  {
    return res.status(500).json(error.message);
  }
});

authorRouter.delete('/:id',async(req:Request,res:Response) =>{
  const id : number = parseInt(req.params.id,10);
  try{
     await AuthorService.deleteAuthor(id)
     return res.status(204).json("Author deleted");
  }
  catch(error:any)
  { 
    return res.status(500).json(error.message);
  }
})