import React, { useEffect } from 'react';

const Footer = (props) => {

  useEffect(() => {
    console.log('Footer rendered');
    return () => {
      console.log('Footer destroyed');
    };
  })
  
  return (
    <div>
      <div>This is Footer</div>
    </div>
  )
}

export default Footer;