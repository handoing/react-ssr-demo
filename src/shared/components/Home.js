const React = require('react');
const Page = require('./Page')
const Home = (props) => {
  return (
    <div>
      <div>This is home</div>
      <button onClick={() => {alert('666')}}>click</button>
      <Page></Page>
    </div>
  )
}

module.exports = Home;