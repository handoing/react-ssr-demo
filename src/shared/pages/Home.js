import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { increase, decrease } from '../redux/action';
import * as style from './Home.module.css';

const Home = (props) => {
  return (
    <div>
      <Link to="/login">login</Link>
      <div>This is home</div>
      <button onClick={() => {props.increase()}}>+</button>
      <span className={style.count}>{props.count}</span>
      <button onClick={() => {props.decrease()}}>-</button>
    </div>
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