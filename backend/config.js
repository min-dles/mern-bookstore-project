// import dotenv files with ES Modules
import dotenv from 'dotenv';
dotenv.config({ path: '../.env'} );

// App Set //
export const PORT = process.env.PORT_NUMBER || 5000;
export const mongoDBURL = process.env.MONGO_DB_URL || 'mongodb+srv:';