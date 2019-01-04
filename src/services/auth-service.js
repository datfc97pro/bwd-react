import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {
  tokenKey = "auth_token";

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }

  saveToken(token) {
    const tokenSplit = token.split(" ")[1];
    localStorage.setItem(this.tokenKey, tokenSplit);
  }

  invalidateUser() {
    localStorage.removeItem(this.tokenKey);
  }

  getExpiration(token) {
    const exp = this.decode(token).exp;

    return moment.unix(exp);
  }

  getUserId() {
    return this.decode(this.getToken()).userId;
  }

  getUsername() {
    return this.decode(this.getToken()).username;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();

    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
