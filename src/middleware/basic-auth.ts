import auth from 'basic-auth'


import { Request, Response } from "express"
import FriendFacade from "../facades/friendFacade"

let facade: FriendFacade;

const authMiddleware = async function (req: Request, res: Response, next: Function) {
  if (!facade) {
    facade = new FriendFacade(req.app.get("db")); //Observe how you have access to the global app-object via the request object
  }
  var credentials = auth(req)
  if (credentials && await check(credentials.name, credentials.pass, req)) {
    next()
  } else {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  }
}

async function check(userName: string, pass: string, req: any) {

  //if (user && compare(pass, user.password)) {
  const verifiedUser = await facade.getVerifiedUser(userName, pass)
  if (verifiedUser) {
    req.credentials = { userName: verifiedUser.email, role: verifiedUser.role }
    //req.credentials = {userName:user.email,role:"user"}  
    return true
  }
  return false
}
export default authMiddleware;







