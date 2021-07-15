class User {
    constructor({login = 'guest', email = null, role = 'guest', permissions = []}) {
        this.login = login
        this.email = email
        this.role = role
        this.permissions = permissions
    }
}

export default User