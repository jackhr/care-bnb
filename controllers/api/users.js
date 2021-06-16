const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const BASE_URL = process.env.S3_BASE_URL;
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

module.exports = {
  login,
  create,
  newCaregiver,
  checkToken,
  allUsers,
  getAllCaregivers,
  getOneCaregiver,
  filterCaregivers,
  currentUser,
};

function checkToken(req, res) {
  // req.user will always be there IF a valid token was sent
  // in the fetch request
  console.log(req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create({
      ...req.body,
      isCaregiver: false,
    });
    const token = createJWT(user);
    // Yes, we can send back a simple string
    res.json(token);
  } catch (err) {
    // Client will check for non-200 status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function newCaregiver(req, res) {
  try {
    const AWSData = getNewImageUrl(req.file);
    const user = User.findById(user._id);
    user.age = req.body.age;
    user.phone_number = req.body.phone_number;
    user.best_time = req.body.best_time;
    user.location = req.body.location;
    user.rate = req.body.rate;
    user.cpr = req.body.cpr;
    user.pet = req.body.pet;
    user.driver = req.body.driver;
    user.englishF = req.body.englishF;
    user.spanishF = req.body.spanishF;
    user.craft = req.body.craft;
    user.first_aid = req.body.first_aid;
    user.tutor = req.body.tutor;
    user.communication = req.body.communication;
    user.facebook = req.body.facebook;
    user.instagram = req.body.instagram;
    user.about = req.body.about;
    user.profile_image = AWSData.url;
    user.AWSkey = AWSData.key;
    await user.save();
    const newUsers = await User.find({});
    res.json(newUsers);
  } catch (err) {
    // Client will check for non-200 status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function getAllCaregivers(req, res) {
  try {
    const allCaregivers = await User.find({ isCaregiver: true });
    res.send(allCaregivers);
  } catch {
    res.status(400).json("Caregivers not found");
  }
}

async function getOneCaregiver(req, res) {
  try {
    const id = req.params.id
    const thisCaregiver = await User.findById(id);
    res.send(thisCaregiver);
  } catch (e) {
    res.status(400).json(e)
  }
}

async function filterCaregivers(req, res) {
  try {
    const filters = req.body.filters
    console.log(filters);
    //need to expand this to plug into the find method called on database
    const caregivers = await User.find({});
    res.send(caregivers)
  } catch (e) {
    res.status(400).json(e)
  }
}

async function allUsers(req, res) {
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
    res.json(allUsers);
  } catch (e) {
    res.status(400).json(e);
  }
}

async function currentUser(req, res) {
  try {
    const currentUser = await User.findById({});
    console.log(currentUser);
    res.json(currentUser);
  } catch (e) {
    res.status(400).json(e);
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

/*-----Helper Functions-----*/

function generateAWSKey(photo) {
  const hex = uuid.v4().slice(uuid.v4().length - 6);
  const fileExtension = photo.mimetype.match(/[/](.*)/)[1].replace("", ".");
  return hex + fileExtension;
}

async function getNewImageUrl(photo) {
  const uploadParams = {
    Bucket: BUCKET,
    Key: generateAWSKey(photo),
    Body: photo.buffer,
  };
  console.log("here in AWS function");
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log(`Successfully uploaded ${uploadParams.Key}:`, data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
  return {
    url: `${BASE_URL}${BUCKET}/${uploadParams.Key}`,
    key: uploadParams.Key,
  };
}
