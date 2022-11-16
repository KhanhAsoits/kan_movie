export default class User {
    constructor(username, email, password, age = null, address = "", numberPhone = null) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.address = address;
        this.numberPhone = numberPhone
    }
}