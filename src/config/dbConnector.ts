import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server"

/**
 *  Connector which you should use for developement and production
 *  Connection String must be given via process.env.CONNECTION
 */
export class DbConnector {
  private static client: MongoClient | null

  public static async connect(): Promise<MongoClient> {
    if (DbConnector.client) {
      return DbConnector.client;
    }
    const uri = process.env.CONNECTION

    if (uri === undefined) {
      throw new Error("NO Database Connection available")
    }

    DbConnector.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, })
    await DbConnector.client.connect();
    return DbConnector.client;
  }


  public static close() {
    if (DbConnector.client) {
      DbConnector.client.close()
      DbConnector.client = null;
    }
  }
}

/**
 * In-memory MongoDB which you should use for testing
 */
export class InMemoryDbConnector {
  private static client: MongoClient | null
  public static async connect(): Promise<MongoClient> {
    if (InMemoryDbConnector.client) {
      return InMemoryDbConnector.client;
    }
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    InMemoryDbConnector.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, })
    await InMemoryDbConnector.client.connect()
    return InMemoryDbConnector.client
  }
}





