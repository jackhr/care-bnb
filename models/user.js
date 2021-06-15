const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
    fname: { type: String, required: true },
    lname: { type: String, required: true }, //steve changed to enhance search options
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      min: 18, //possibly update this based on casualness of platform
      required: true,
    },
    phone_number: {
      type: String,
      trim: true,
      minlength: 10,
      required: true,
    },
    profile_image: String,
    AWS_KEY: String,
    best_time: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      //can change this to an array of objects to accept full addresss form data
      type: String,
      required: true,
    },
    rate: Number,
    credentials: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    about: String, //steve added this
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
