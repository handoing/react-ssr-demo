import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

class Login extends React.Component {
  serverFetchData(req, res) {
    return new Promise((resolve, reject) => setTimeout(resolve, 2000));
  }

  render() {
    return (
      <>
        <Helmet>
          <title>🌚🌚🌚</title>
          <meta name="keywords" content="🌚🌚🌚" />
          <meta name="description" content="🌚🌚🌚" />
        </Helmet>
        <Link to="/">home</Link>
        <div>This is login</div>
      </>
    );
  }
}

export default Login;