import { isEmail } from 'validator'
import * as mongoose from 'mongoose'

export const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: email => isEmail(email),
      message: '{VALUE} is not a valid email',
    },
  },
})

const Account = mongoose.model('Account', AccountSchema)
export default Account
