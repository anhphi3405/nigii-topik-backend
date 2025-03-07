const redis = require('redis');
const createClient = require('redis').createClient;

const connectRedis = async () => {
  const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'phi');
const value = await client.get('key');
console.log(value);
await client.disconnect();
}

module.exports = connectRedis;

