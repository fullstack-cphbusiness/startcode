import * as mongo from "mongodb"
import PositionFacade from '../src/facades/positionFacade';
import { hash } from "bcryptjs"
import { positionCreator, getLatitudeInside, getLatitudeOutside } from "../src/utils/geoUtils"
import { ApiError } from "../src/errors/errors"
import chai from "chai";

const expect = chai.expect;

const DIST_TO_SEARCH = 500;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { InMemoryDbConnector } from "../src/config/dbConnector"
let positionCollection: mongo.Collection
let friendsCollection: mongo.Collection
let positionFacade: PositionFacade;

describe("## Verify the Positions Facade ##", () => {

  before(async function () {
    const client = await InMemoryDbConnector.connect();
    const db = client.db();
    positionCollection = db.collection("positions");
    friendsCollection = db.collection("friends")
    positionFacade = new PositionFacade(db)
    await positionCollection.createIndex({ "lastUpdated": 1 }, { expireAfterSeconds: 60 })
    await positionCollection.createIndex({ location: "2dsphere" })
  })

  beforeEach(async () => {
    //TODO -->/// INSERT CODE_BLOCK-2
  })

  describe("Verify the addOrUpdatePosition method", () => {
    xit("It should update pp@b.dk's position document", async () => {
      const result = await positionFacade.addOrUpdatePosition("pp@b.dk", 2, 3)
      expect(result.name).to.be.equal("Peter Pan")
      expect(result.location.coordinates[0]).to.be.equal(2)
    })
  })

  //Whether this test passed depends on whether you have designed it to throw an exception
  describe("Verify the addOrUpdatePosition method", () => {
    xit("It should not update XXXX@b.dk's position document", async () => {
      await expect(positionFacade.addOrUpdatePosition("XXXX@b.dk", 2, 3)).to.be.rejectedWith(ApiError)
    })
  })

  describe("Verify the findNearbyFriends method", () => {
    xit("Should Not find ", async () => {
      const result = await positionFacade.findNearbyFriends("pp@b.dk", "secret", 12.48, 55.77, DIST_TO_SEARCH)
      expect(result.length).to.be.equal(1)
      expect(result[0].name).to.be.equal("Donald Duck")
    })
  })

  describe("Verify the findNearbyFriends method", () => {
    xit("Should Not find xxxxxxxx@b.dk", async () => {
      await expect(positionFacade.findNearbyFriends("xxxxxxxx@b.dk", "secret", 12.48, 55.77, DIST_TO_SEARCH)).to.be.rejectedWith(ApiError)
    })
  })

})