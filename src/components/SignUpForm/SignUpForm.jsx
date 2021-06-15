import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirm: '',
    age: '',
    phone_number: '',
    best_time: '',
    location: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = new FormData();
      const fileField = document.querySelector('input[type="file"]');
      fileField.files.length && formData.append('profile_image', fileField.files[0]);
      formData.append('fname', this.state.fname);
      formData.append('lname', this.state.lname);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('confirm', this.state.confirm);
      formData.append('age', this.state.age);
      formData.append('phone_number', this.state.phone_number);
      formData.append('best_time', this.state.best_time);
      formData.append('location', this.state.location);
      formData.append('rate', this.state.rate);
      formData.append('credentials', this.state.credentials);
      formData.append('linkedin', this.state.linkedin);
      formData.append('facebook', this.state.facebook);
      formData.append('instagram', this.state.instagram);
      formData.append('about', this.state.about);
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // baby step
      this.props.setUser(user);
    } catch {
      // An error occurred
      this.setState({ error: 'Sign Up Failed - Try Again'});
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label>Profile Picture</label>
            <input type="file" name="profile_image" value={this.state.profile_image} onChange={this.handleChange} required />
            <label>First Name</label>
            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange} required />
            <label>Last Name</label>
            <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <label>Age</label>
            <input type="number" name="age" value={this.state.age} onChange={this.handleChange} required />
            <label>Phone Number</label>
            <input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} required />
            <label>Best Time To Be Reached</label>
            <input type="text" name="best_time" value={this.state.best_time} onChange={this.handleChange} required />

            <label>Location (City, State)</label>
            <input type="text" name="location" value={this.state.location} onChange={this.handleChange} required />
            <label>Certifications</label>
            <input type="text" name="credentials" value={this.state.credentials} onChange={this.handleChange} required />
            <label>Rate per hour</label>
            <input type="text" name="rate" value={this.state.rate} onChange={this.handleChange} required />

            <label>Bio</label>
            <textarea type="text" name="about" value={this.state.about} onChange={this.handleChange} required />

            <label>LinkedIn</label>
            <input type="text" name="linkedin" value={this.state.linkedin} onChange={this.handleChange} /><label>Facebook</label>
            <input type="text" name="facebook" value={this.state.facebook} onChange={this.handleChange}  /><label>Instagram</label>
            <input type="text" name="instagram" value={this.state.instagram} onChange={this.handleChange}  />


            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}