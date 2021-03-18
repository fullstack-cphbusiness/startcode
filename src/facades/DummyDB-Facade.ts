import { IFriend } from '../interfaces/IFriend';

function singleValuePromise<T>(val: T | null): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}

function arrayValuePromise<T>(val: Array<T>): Promise<Array<T>> {
  return new Promise<Array<T>>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}

class FriendsFacade {
  friends: Array<IFriend> = [
    { id: "id1", firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: "secret" },
    { id: "id2", firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: "secret" },
  ]
  async addFriend(friend: IFriend): Promise<IFriend> {
    throw new Error("Not Yet Implemented But return element deleted or null")
  }
  async deleteFriend(friendEmail: string): Promise<IFriend> {
    throw new Error("Not Yet Implemented But return element deleted or null")
  }
  async getAllFriends(): Promise<Array<IFriend>> {
    return arrayValuePromise<IFriend>(this.friends);
  }
  async getFrind(friendEmail: string): Promise<IFriend | null> {
    let friend: IFriend | null
    friend = this.friends.find(f => f.email === friendEmail) || null;
    return singleValuePromise<IFriend>(friend);
  }
}
const facade = new FriendsFacade();
export default facade;
