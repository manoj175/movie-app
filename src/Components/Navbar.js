import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', background:'#5d8c87'}}>
          <h1><i className="fa fa-film" aria-hidden="true" style={{color:'white',marginTop:'1.35rem',marginLeft:'1rem'}} /></h1>
          <Link to='/' style={{textDecoration:'none',color:'white'}}><h1 style={{padding:'1rem'}}>Movies App</h1></Link>
          <Link to='/favourites' style={{textDecoration:'none',color:'white'}}><h2 style={{marginLeft:'2rem', marginTop:'1.5rem'}}>Favourites</h2></Link>       
        </div>
    )
  }
}
