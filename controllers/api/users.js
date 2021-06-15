const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require('uuid');
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const BASE_URL = process.env.S3_BASE_URL;
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

module.exports = {
  create,
  login,
  checkToken,
  getAll,
};

function checkToken(req, res) {
  // req.user will always be there IF a valid token was sent
  // in the fetch request
  console.log(req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    console.log(req.file);
    const AWSData = await getNewImageUrl(req.file);
    console.log('here 0', AWSData.url);
    const user = await User.create({
      ...req.body,
      AWS_KEY: AWSData.key,
      profile_image: AWSData.url,
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

async function getAll(req, res) {
  try {
    const allCaregivers = await User.find({});
    res.send(allCaregivers);
    console.log(allCaregivers);
  } catch {
    res.status(400).json("Caregivers not found");
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
  const hex = uuid.v4().slice(uuid.v4().length-6);
  const fileExtension = photo.mimetype.match(/[/](.*)/)[1].replace('', '.');
  return hex + fileExtension;
}

async function getNewImageUrl(photo) {
  const uploadParams = {
    Bucket: BUCKET,
    Key: generateAWSKey(photo),
    Body: photo.buffer
  }
  console.log('here in AWS function');
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
  } 
}