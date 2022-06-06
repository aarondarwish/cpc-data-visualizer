import { Client } from 'redis-om';
import { createClient } from 'redis';

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* Create a connection to Redis with Node Redis */
export const connection = createClient({ url });
await connection.connect();

/* create and open the Redis OM Client */
const client = await new Client().open(url);

export default client;