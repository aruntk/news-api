import dotenv from 'dotenv';

dotenv.config({ silent: true });
export const {
  NEWS_API_KEY
} = process.env;
console.log('key',NEWS_API_KEY);
