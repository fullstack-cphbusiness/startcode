import path from "path"
require('dotenv').config({ path: path.join(__dirname, "..", "..", '.env') })
import { DbConnector } from "../config/dbConnector"
const debug = require("debug")("setup-friend-testdata")
import { hash } from "bcryptjs"

async function tester() {
  const client = await DbConnector.connect()
  const db = client.db(process.env.DB_NAME)
  
  const friendsCollection = db.collection("friends");
  const hashedPW = await hash("secret", 8);
  friendsCollection.createIndex({ email: 1 }, { unique: true })

  await friendsCollection.deleteMany({});

  const status = await friendsCollection.insertMany([
    { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
    { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
    { firstName: "Peter", lastName: "Admin", email: "peter@admin.dk", password: hashedPW, role: "admin" },
  ])


  debug(`Inserted ${status.insertedCount} test users`)
  debug(`##################################################`)
  debug(`NEVER, EVER EVER run this on a production database`)
  debug(`##################################################`)
  DbConnector.close();
}

tester();