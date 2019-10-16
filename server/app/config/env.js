const env = {
    database:'testdbnode',
    username:'root',
    password:'',
    host:'localhost',
    dialect:'mysql',
    pool:{
        max: 5,
        min: 0,
        acquire:30000,
        idle:10000
    }
};

// const env = {
//     database:'my_db',
//     username:'app_user',
//     password:'app_password',
//     host:'localhost',
//     dialect:'mysql',
//     pool:{
//         max: 5,
//         min: 0,
//         acquire:30000,
//         idle:10000
//     }
// };
module.exports = env;