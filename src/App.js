import React from 'react';
import './firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

class App extends React.Component {
  state = {
    mobile: '',
    otp: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  configureCaptcha = () => {
    const auth = getAuth();

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("ReCaptcha Verified");
      },
      defaultCountry: 'IN'
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const auth = getAuth();

    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("Code is Sent");
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        console.log("Error in Sending OTP message");
      });
  }

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user));
      alert("User signed in successfully");
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
      console.log("Error in verifying OTP");
    });
  }

  render() {
    return (
      <div className='MobileOTP body' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center', padding: '20px', border: '3px solid #3498db', borderRadius: '10px', width: '300px', background: '#ffffff', boxShadow: '5px 10px #888888' }}>
          <h2 style={{ color: '#3498db', fontFamily: 'Arial, sans-serif', fontSize: '28px' }}>Verify Your Mobile Number</h2>

          <form onSubmit={this.onSignInSubmit} style={{ padding: '10px' }}>
            <input type="tel" name='mobile' id='mobile' placeholder="Enter your mobile number" required onChange={this.handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type='submit' name='sign-in-button' id='sign-in-button' value='Get Code' style={{ background: '#3498db', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
          </form>

          <h4 style={{ color: '#3498db', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Enter OTP</h4>
          <form onSubmit={this.onSubmitOTP} style={{ padding: '10px' }}>
            <input type="number" name='otp' id='otp' placeholder="Enter your OTP number" required onChange={this.handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type='submit' name='verify' id='verify' value='Verify' style={{ background: '#3498db', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
          </form>

          <br /><br />
          <a href='/' style={{ color: '#3498db', fontFamily: 'Arial, sans-serif' }}>Go to Back</a>
        </div>
      </div>
    );
  }
}

export default App;
