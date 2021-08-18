import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  serverFetchData(req, res) {
    return new Promise((resolve, reject) => setTimeout(resolve, 2000));
  }

  render() {
    return (
      <div>
        <Link to="/">home</Link>
        <div>This is login</div>
      </div>
    );
  }
}

export default Login;