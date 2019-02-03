import { isEmail } from 'validator'
import * as mongoose from 'mongoose'

// TODO: use env vars
const uri: string = 'mongodb://127.0.0.1:27017/development'

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
})

export const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: email => validator.isEmail(email),
      message: '{VALUE} is not a valid email',
    },
  },
})

const Account = mongoose.model('Account', AccountSchema)
export default Account
