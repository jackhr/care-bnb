import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

export default function caregiverProfile({
  fname,
  lname,
  email,
  phone_number,
  location,
  experiences,
  age,
  about,
  best_time,
  credentials,
  rate,
  linkedin,
  facebook,
  instagram,
  profile_image,
}) 

/* values removed from sign up that strictly relate to caregivers

rate: '',
credentials: '',
linkedin: '',
facebook: '',
instagram: '',
about: '',
profile_image: ''

*/

{
  return (
    <div className="profile-container">
      <img src={profile_image} alt="" />
      <div className="name-container">
        <div>
          <h1>{fname} {lname}, {age}</h1>
          <CheckCircleIcon style={{marginLeft: "2vmin",fontSize: "5vmin", color: "#588B8B" }} fontSize="large" />
        </div>
        <FavoriteBorderIcon style={{ fontSize: "5vmin" }} />
      </div>
    </div>
  );
}
