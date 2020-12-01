import {compareSync, genSaltSync, hashSync} from 'bcrypt'

export const loginUser = async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    try {
        const [foundUser] = await db.auth.check_email(email)
        if (!foundUser) return res.status(401).send("Invalid email or password.")
        
        const getPass = await db.shared.get_user_pass(email)
        const passwordCheck = compareSync(password, getPass)
        if (!passwordCheck) return res.status(401).send("Invalid email or password.")

        req.session.user = foundUser
        return res.status(200).send(req.session.user)
    } catch (err) {
        res.sendStatus(400)
        console.log("Database error on login function", err)
    }
}

export const registerUser = async (req, res) => {
    const db = req.app.get('db')
    const {email, username, password} = req.body
    const {check_email, check_username, register_user} = db.auth
    //# if getting error, make sure you're passing in null for the optional values!

    try {
        const [foundUsername] = await check_username(username)
        const [foundEmail] = await check_email(email)

        if (!foundUsername) {
            if (!foundEmail) {
                const salt = genSaltSync(10)
                const hash = hashSync(password, salt)

                password = hash
                req.body.profile_pic = `https://avatars.dicebear.com/api/identicon/${username}.svg`
                const [newUser] = await register_user(req.body)

                req.session.user = newUser
                res.status(200).send(req.session.user)
            } else {
                return res.status(401).send("Email already in use")
            }
        } else {
            return res.status(401).send("Username already in use")
        }
    } catch (err) {
        res.sendStatus(400)
        console.log("Database error on register function", err)
    }
}

export const logoutUser = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}