import { useState } from "react";
import * as usersAPI from "../../utilities/users-api";

export default function CaregiverForm({ setUsers }) {

  const [cgData, setCGData] = useState({
    age: "",
    phone_number: "",
    best_time: "",
    location: "",
    rate: "",
    cpr: false,
    pet: false,
    driver: false,
    englishF: false,
    spanishF: false,
    craft: false,
    first_aid: false,
    tutor: false,
    communication: false,
    facebook: "",
    instagram: "",
    about: "Let us know a little more bit about yourself",
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('age', cgData.age);
    formData.append('phone_number', cgData.phone_number);
    formData.append('best_time', cgData.best_time);
    formData.append('location', cgData.location);
    formData.append('rate', cgData.rate);
    formData.append('cpr', cgData.cpr);
    formData.append('pet', cgData.pet);
    formData.append('driver', cgData.driver);
    formData.append('englishF', cgData.englishF);
    formData.append('spanishF', cgData.spanishF);
    formData.append('craft', cgData.craft);
    formData.append('first_aid', cgData.first_aid);
    formData.append('tutor', cgData.tutor);
    formData.append('communication', cgData.communication);
    formData.append('facebook', cgData.facebook);
    formData.append('instagram', cgData.instagram);
    formData.append('about', cgData.about);
    fileField.files.length && formData.append('profile_image', fileField.files[0]);
    const newUsers = await usersAPI.newCaregiver(formData);
    setUsers(newUsers);
  }

  function handleChange(evt) {
    const isCheckBox = evt.target.type === "checkbox" ? "checked" : "value";
    setCGData({...cgData, [evt.target.name]: evt.target[isCheckBox]})
  }

  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
        <input className="cargiver-input" placeholder="Profile Image" type="file" name="profile_image" required />
        <input className="cargiver-input" placeholder="Age" type="number" name="age" value={cgData.age} onChange={handleChange} required />
        <input className="cargiver-input" placeholder="Phone #" type="number" name="phone_number" value={cgData.phone_number} onChange={handleChange} required />
        <input className="cargiver-input" placeholder="Best Time to Contact You" type="text" name="best_time" value={cgData.best_time} onChange={handleChange} required />
        <input className="cargiver-input" placeholder="Location" type="text" name="location" value={cgData.location} onChange={handleChange} required />
        <input className="cargiver-input" placeholder="Rate/hr" type="number" name="rate" value={cgData.rate} onChange={handleChange} required />
        <h3 style={{marginTop: "5vmin"}}>Can You provide Any of These?</h3>
        <br />
        <div className="checkbox-div">
          <label htmlFor="cpr">CPR Certified</label>
          <input id="cpr" type="checkbox" name="cpr" checked={cgData.cpr} onChange={handleChange}/>
        </div>
        <div className="checkbox-div">
          <label htmlFor="pet">Pet Friendly</label>
          <input id="pet" type="checkbox" name="pet" checked={cgData.pet} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="driver">Can Drive</label>
          <input id="driver" type="checkbox" name="driver" checked={cgData.driver} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="englishF">Fluent in English</label>
          <input id="englishF" type="checkbox" name="englishF" checked={cgData.englishF} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="spanishF">Fluent in Spanish</label>
          <input id="spanishF" type="checkbox" name="spanishF" checked={cgData.spanishF} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="craft">Arts & Crafts</label>
          <input id="craft" type="checkbox" name="craft" checked={cgData.craft} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="first_aid">First Aid</label>
          <input id="first_aid" type="checkbox" name="first_aid" checked={cgData.first_aid} onChange={handleChange} />
        </div>
        <div className="checkbox-div">
          <label htmlFor="tutor">Homework Help</label>
          <input id="tutor" type="checkbox" name="tutor" checked={cgData.tutor} onChange={handleChange} />
        </div>
        <div style={{marginBottom: "5vmin"}} className="checkbox-div">
          <label htmlFor="communication">Open Communication</label>
          <input id="communication" type="checkbox" name="communication" checked={cgData.communication} onChange={handleChange} />
        </div>
        <input className="cargiver-input" placeholder="Facebook" type="text" name="facebook" value={cgData.facebook} onChange={handleChange} />
        <input className="cargiver-input" placeholder="Instagram" type="text" name="instagram" value={cgData.instagram} onChange={handleChange} />
        <textarea className="cargiver-input" name="about" value={cgData.about} onChange={handleChange} cols="28" rows="5" ></textarea>
        <button id="caregiver-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
