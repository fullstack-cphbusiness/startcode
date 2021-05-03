import path from "path"
require('dotenv').config({ path: path.join(__dirname, "..", "..", '.env') })
import { DbConnector } from "../config/dbConnector"
const debug = require("debug")("setup-friend-testdata")
import { hash } from "bcryptjs"
import { positionCreator } from "./geoUtils"

async function makeTestPositions() {
  const client = await DbConnector.connect()
  const db = client.db(process.env.DB_NAME)

  const friendsCollection = db.collection("friends");
  const hashedPW = await hash("secret", 8);
  friendsCollection.createIndex({ email: 1 }, { unique: true })

  await friendsCollection.deleteMany({});

  const f1 = { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" }
  const f2 = { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" }
  const f3 = { firstName: "Peter", lastName: "Admin", email: "peter@admin.dk", password: hashedPW, role: "admin" }

  const status = await friendsCollection.insertMany([f1, f2, f3])
  debug(`Inserted ${status.insertedCount} test users`)

  /// INSERT CODE_BLOCK-1

  debug(`##################################################`)
  debug(`NEVER, EVER EVER run this on a production database`)
  debug(`##################################################`)
  DbConnector.close();
}

makeTestPositions();