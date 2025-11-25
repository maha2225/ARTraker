// import { Sequelize } from "sequelize";
// import dbConfig from "./config.js";

// const dbConf = dbConfig["development"];

// export const sequelize = dbConf.use_env_variable
//   ? new Sequelize(process.env[dbConf.use_env_variable], {
//       dialect: dbConf.dialect,
//       logging: false,
//     })
//   : new Sequelize(
//       dbConf.database,
//       dbConf.username,
//       dbConf.password,
//       {
//         host: dbConf.host,
//         dialect: dbConf.dialect,
//         logging: false,
//       }
//     );

// export default sequelize;
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql