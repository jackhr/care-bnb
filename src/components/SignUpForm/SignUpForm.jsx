import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import Error from './Error';

export default class SignUpForm extends Component {
  state = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirm: '',
    error: null
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: null
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {...this.state}
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // baby step
      this.props.setUser(user);
    } catch(err) {
      // An error occurred
      this.setState({ error: err.response.data});
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="login-form">

        <div className="error-notif">
          {this.state.error && <Error error={this.state.error.messages}/>}
        </div>

        <form autoComplete="off" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input className="sign-up-inputs" placeholder="First Name" type="text" name="fname" value={this.state.fname} onChange={this.handleChange} required />
          <input className="sign-up-inputs" placeholder="Last Name" type="text" name="lname" value={this.state.lname} onChange={this.handleChange} required />
          <input className="sign-up-inputs" placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          <input className="sign-up-inputs" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <input className="sign-up-inputs" placeholder="Confirm Password" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          <button className="login-btn" type="submit" disabled={disable}>Sign Up</button>
        </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}