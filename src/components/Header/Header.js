import React from 'react';
import Form from '../Form';
import "./Header.css";
import Present from '../Present';

class Header extends React.Component {
  render() {
  return (
    <div className="header">
    <div className="logoWrapper">
      <img src={"./assets/logo.svg"} />
      <div className="content">
        <Form />
        <Present /> 
      </div>
    </div>
    </div>
  )
}
}
export default Header;
