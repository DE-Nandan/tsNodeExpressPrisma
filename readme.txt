Library api where we would have set of authors and set of books 

npm i express dotenv cors express-validatot @prisma/client


dotenv - used for loading env variables from dotenv file
cors - used as middleware for express applicatoin
express-validator - validate our api body or when we post something or put something this just adds an additional layer of validation

types/ --> used for using type definitions while using type script
npm i -D typescript @types/node @types/express @types/dotenv @types/cors


npm i --save-dev prisma esbuild-register nodemon

esbuild-register : as we are going to be seeding our database with data before we jump into api that way we dont need to worry much about always adding data when we reaset our database 

npx prisma init --datasource-provider sqlite


// For syncing db with prisma schema
npx prisma db push

// seeding data into db so that not always have to insert data when reloaded
npx prisma db seed