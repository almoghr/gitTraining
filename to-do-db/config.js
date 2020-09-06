module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app',
    port: process.env.PORT || 3000,
}
