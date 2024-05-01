import { config }  from 'dotenv';

config();

export const secret = process.env.SECRET;