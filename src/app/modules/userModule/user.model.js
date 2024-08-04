const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [8, 'Password must be at least 8 character'],
    },
    profileImage: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'block', 'disable'],
        default: 'active'
    }
    // wallet: {
    //     balance: { type: Number, default: 0 },
    //     transactions: [{
    //         amount: { type: Number, required: true },
    //         date: { type: Date, default: Date.now },
    //         type: { type: String, required: true } // 'credit' or 'debit'
    //     }]
    // }
},{   
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = async function (userPlanePassword) {
    const isMatch = await bcrypt.compare(userPlanePassword, this.password)
    return isMatch
}


const User = mongoose.model('user', userSchema)

module.exports = User
