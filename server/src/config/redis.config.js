import { createClient } from 'redis';
// import ENV from './env.config.js'
// const client = createClient({
//     username: ENV.REDIS_USER_NAME,
//     password: ENV.REDIS_PASSWORD,
//     socket: {
//         host: ENV.REDIS_HOST,
//         port: ENV.REDIS_PORT
//     }
// });
// console.log("redis is connected")
// client.on('error', err => console.log('Redis Client Error', err));



// export default client;
const client = createClient({
    username: 'default',
    password: 'FpUIZ14sMuG4I7h7rphEetXku1PQPOeR',
    socket: {
        host: 'redis-12708.c277.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 12708
    }
});
console.log("redis is connected")
client.on('error', err => console.log('Redis Client Error', err));



export default client;