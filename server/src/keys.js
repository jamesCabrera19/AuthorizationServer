// mongodb cluster credentials
// user name: JaimeCabrera, password: password12345

const mongoUri = `mongodb+srv://JaimeCabrera:password12345@cluster0.qqzlxpe.mongodb.net/?retryWrites=true&w=majority`;

const encryptionKey = "MY_SERCRET_KEY";

module.exports = { encryptionKey, mongoUri };
