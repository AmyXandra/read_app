import { isAuthenticatedUser } from '../../../libs/util/Auth';

export default function CheckUnauthenticatedRead() {
  //check if authenticated
  if (!isAuthenticatedUser()) {
    //check no. of unauthenticated read
    let unauthenticatedRead = localStorage.getItem('UNAUTH_READ');
    //check if unauthenticated read exists
    if (!unauthenticatedRead) {
      localStorage.setItem('UNAUTH_READ', 1);
      return false;
    } else {
      //check if no. of unauthenticated read is 3
      if (Number(unauthenticatedRead) > 3) {
        return true;
      } else {
        //increment no. of unauthenticated read
        unauthenticatedRead = Number(unauthenticatedRead) + 1;
        localStorage.setItem('UNAUTH_READ', unauthenticatedRead);
        return false;
      }
    }
  } else {
    return false;
  }
}
