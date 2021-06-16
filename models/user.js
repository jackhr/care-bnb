const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require('validator');

const SALT_ROUNDS = 6;

const experienceSchema = new Schema(
  {
    name: String,
    time_spent: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, 'please include your first name.']
    },
    lname: {
      type: String,
      required: [true, 'please include your last name.']
    }, //steve changed to enhance search options
    email: {
      type: String,
      unique: [true, 'sorry, {VALUE} has already been registered.'],
      trim: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, 'please enter a valid email address.']
    },
    password: {
      type: String,
      trim: true,
      minLength: [8, 'sorry, password must be 8 or more characters.'],
      required: [true, 'please enter a valid password.']
    },
    age: {
      type: Number,
      trim: true,
      min: [18, 'you must be 18+ to sign up for this application.'] //possibly update this based on casualness of platform
    },
    phone_number: {
      type: Number,
      trim: true,
      min: [10, 'please enter a valid phone number.'],
      max: 13
    },
    profile_image: String,
    AWS_KEY: String,
    best_time: {
      type: String,
      trim: true,
    },
    location: {
      //can change this to an array of objects to accept full addresss form data
      type: String,
    },
    rate: [Number, 'hourly rate must be a number.'],
    credentials: String,
    linkedin: String,
    facebook: String,
    instagram: String,

    // can we clean this up before mvp and turn these into an enum type?
  /*skills: {
    type: String,
    enum: ['CPR', 'Pet-Friendly', etc etc]
    required: function() {
      return this.isCaregiver === true;
    }
  }
    with this syntax it basically says, if this person is a caregiver, they are required to list skills
  */

    cpr: Boolean,
    pet: Boolean,
    driver: Boolean,
    englishF: Boolean,
    spanishF: Boolean,
    craft: Boolean,
    first_aid: Boolean,
    tutor: Boolean,
    communication: Boolean,
    about: String, //steve added this
    isCaregiver: false,
    experiences: [experienceSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  // password has changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});

module.exports = mongoose.model("User", userSchema);
