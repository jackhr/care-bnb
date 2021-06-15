import React from "react";

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
      <h1>
        Name: {fname} {lname}
      </h1>

      <img src={profile_image} alt="" />
      <h2>Email: {email}</h2>
      <h2>Phone: {phone_number}</h2>
      <h2>Location: {location}</h2>
      <h2>Age: {age}</h2>
      <h2>About Me: {about}</h2>
      <h2>Best Time To Be Reached: {best_time}</h2>
      <h2>Certifications: {credentials}</h2>
      <h2>Rate: {rate}</h2>
      <h2>LinkedIn: {linkedin}</h2>
      <h2>Facebook: {facebook}</h2>
      <h2>Instagram: {instagram}</h2>
    </div>
  );
}
