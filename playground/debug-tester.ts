import * as dotenv from "dotenv";
dotenv.config()
import debug from 'debug'
const debug1 = debug('xxx:a')
const debug2 = debug('xxx:b')
const debug3 = debug('xxx:c')

console.log("A1")
debug1("hello")
debug2("hello b")
debug3(process.env.PORT)
