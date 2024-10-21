//import { mysql } from 'mysql2/promise';
// import { SetRequired } from './../node_modules/sequelize/types/utils/set-required.d';
// import { SQLFragment } from './../node_modules/sequelize/types/generic/sql-fragment.d';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { error } from 'console';
// import { Sequelize } from 'sequelize';
// import { createConnection } from 'typeorm';


// dotenv.config(); //load cac bien tu .env

// // const pool = mysql.createPool(
// //     {
// //         host:process.env.DB_HOST||'localhost',
// //         user:process.env.DB_USER||'root',
// //         password:process.env.DB_PASSWORD||'',
// //         database:process.env.DB_NAME||'tour_db',
// //         waitForConnections:true,
// //         connectionLimit:10,
// //         queueLimit:0
// //     }
// // );

// // //ketnoi thu
// // pool.getConnection().then((connection)=>
// // {
// //     console.log('connected');
// //     connection.release();
// // }
// // ).catch((err)=>{
// //     console.error('Unabled: ', err)
// // });

// // export default pool;


// const sequelize = new Sequelize(
//     process.env.DB_NAME||'tour_db',
//     process.env.DB_USER||'root',
//     process.env.DB_PASSWORD||'',
//     {
//         host:process.env.DB_HOST||'localhost',
//         dialect:'mysql'
//     }
// );

// //kiemtra ketnoi

// sequelize.authenticate()
// .then(()=>{
//     console.log('sucessfully');
// }).catch((err)=>
// {
//     console.error('unabled: ', err)
// });

// export default sequelize;

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any, 
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"],
    synchronize: true,
    logging: true,
  });
  
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected!');
    })
    .catch((error) => {
      console.log('Database connection failed:', error);
    });
