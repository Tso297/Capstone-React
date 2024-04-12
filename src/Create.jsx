import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Background from '../public/container-spices.jpg';

export default class Create extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Handling submit...');
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    const body = {
      username,
      email,
      password,
    };

    const url = 'http://127.0.0.1:5000/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }

    console.log('Sending request...');
    const res = await fetch(url, options);
    const data = await res.json();
    console.log('Received response:', data);
    console.log(data.status)
    if (data.status === 'ok') {
      console.log('Redirecting...');
      this.setState({
        redirect: true
      });
    } else {
      console.log('Signup failed.');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to='http://localhost:5173/' />;
    }
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="col-md-8">
          <div className="card p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h1 className="text-center">Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}