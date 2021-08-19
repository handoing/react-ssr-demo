import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { increase, decrease } from '../redux/action';
import Footer from './Footer';
import * as style from './Home.module.css';

const Home = (props) => {
  return (
    <>
      <Helmet>
        <title>🌝🌝🌝</title>
        <meta name="keywords" content="🌝🌝🌝" />
        <meta name="description" content="🌝🌝🌝" />
      </Helmet>
      <Link to="/login">login</Link>
      <div>This is home</div>
      <button onClick={() => {props.increase()}}>+</button>
      <span className={style.count}>{props.count}</span>
      <button onClick={() => {props.decrease()}}>-</button>
      <Footer></Footer>
    </>
  )
}

const mapStateToProps = (state) => ({
  count: state.home.count,
});

const mapDispatchToProps = {
  increase,
  decrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);