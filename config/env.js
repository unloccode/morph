module.exports = {
    HOST: 'localhost',
    USERNAME: 'root',
    PASSWORD: '123n',
    DB: 'morph',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};