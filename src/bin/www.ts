import app from "../app"
const debug = require("debug")("www");

const PORT = process.env.PORT || 3333;

console.log(process.env.DEBUG)
app.listen(PORT, () => debug(`Server started, listening on PORT: ${PORT}`))
