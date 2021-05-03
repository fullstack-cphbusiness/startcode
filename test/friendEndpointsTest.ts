import path from "path";
import { expect } from "chai"
import app from "../src/app"

import supertest from "supertest"
const request = supertest(app)

import bcryptjs from "bcryptjs"
import * as mongo from "mongodb"
import { InMemoryDbConnector } from "../src/config/dbConnector"
let friendCollection: mongo.Collection;

describe("### Describe the Friend Endpoints (/api/friends) ###", function () {
  let URL: string;

  before(async function () {
    const connection = await InMemoryDbConnector.connect();
    const db = connection.db()
    app.set("db", db)
    app.set("db-type", "TEST-DB")
    friendCollection = db.collection("friends")
  })

  beforeEach(async function () {
    const hashedPW = await bcryptjs.hash("secret", 8)
    await friendCollection.deleteMany({})
    //Last friend below is only necessary if you have added authentications
    await friendCollection.insertMany([
      { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
      { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
      { firstName: "Ad", lastName: "Admin", email: "aa@a.dk", password: hashedPW, role: "admin" },
    ])
  })

  //In this, and all the following REMOVE tests that requires authentication if you are using the simple version of friendRoutes
  describe("While attempting to get all users", function () {
    it("it should get two users when authenticated", async () => {
      const response = await request
        .get('/api/friends/all')
        .auth("pp@b.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.length).to.equal(3)
    })

    xit("it should get a 401 when NOT authenticated", async () => {
    })
  })

  describe("While attempting to add a user", function () {
    xit("it should Add the user Jan Olsen", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const response = await request.post('/api/friends').send(newFriend)
      expect(response.status).to.equal(200)
      expect(response.body.id).to.be.not.null
    })

    xit("It should fail to Add user due to wrong password length", async () => {
    })
  })
  describe("While logged in as a user", function () {
    xit("It should return the logged in user", async () => {
    })
    xit("It should edit the logged in user", async () => {
    })
  })
  describe("While verifying the get any user, given a userId (email)", function () {
    xit("It should allow an admin user to find Donald Duck", async () => {
    })
    xit("It should not, allow admin-users to find a non-existing user", async () => {
    })

    xit("It should not let a non-admin user find Donald Duck", async () => {
    })
  })

  describe("While verifying the 'edit any user', given a userId (email)", function () {
    xit("It should allow an admin-user to edit Peter Pan", async () => {
    })
    xit("It should NOT allow a non-admin user to edit Peter Pan", async () => {
    })
  })
  describe("While verifying the delete any user, given a userId (email)", function () {
    xit("It should allow an admin user to delete Donald Duck", async () => {
    })
    xit("It should NOT allow a non-admin user to delete Donald Duck", async () => {
    })
  })
})
