export class User {
  uid: string;
  email: string;
  password?: string;
  nickname: string;

  constructor(uid: string, email: string, nickname: string, password?: string) {
    this.uid = uid;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}
