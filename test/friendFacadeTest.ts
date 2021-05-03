import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';

import chai from "chai";
const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/errors";

let friendCollection: mongo.Collection;
let facade: FriendFacade;

describe("## Verify the Friends Facade ##", () => {

  before(async function () {
    const client = await InMemoryDbConnector.connect();
    const db = client.db();
    friendCollection = db.collection("friends");
    facade = new FriendFacade(db)
  })


  beforeEach(async () => {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    await friendCollection.insertMany([
      { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
      { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
    ])
  })

  describe("Verify the addFriend method", () => {
    xit("It should Add the user Jan", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const status = await facade.addFriend(newFriend);
      expect(status).to.be.not.null
      const jan = await friendCollection.findOne({ email: "jan@b.dk" })
      expect(jan.firstName).to.be.equal("Jan")
    })

    xit("It should not add a user with a role (validation fails)", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
    })
  })

  describe("Verify the editFriend method", () => {
    xit("It should change lastName to XXXX", async () => {
    })
  })

  describe("Verify the deleteFriend method", () => {
    xit("It should remove the user Peter", async () => {
    })
    xit("It should return false, for a user that does not exist", async () => {
    })
  })

  describe("Verify the getAllFriends method", () => {
    xit("It should get two friends", async () => {
    })
  })

  describe("Verify the getFriend method", () => {

    xit("It should find Donald Duck", async () => {
    })
    xit("It should not find xxx.@.b.dk", async () => {
    })
  })

  describe("Verify the getVerifiedUser method", () => {
    it("It should correctly validate Peter Pan's credential,s", async () => {
      const veriefiedPeter = await facade.getVerifiedUser("pp@b.dk", "secret")
      expect(veriefiedPeter).to.be.not.null;
    })

    xit("It should NOT validate Peter Pan's credential,s", async () => {
    })

    xit("It should NOT validate a non-existing users credentials", async () => {
    })
  })

})