import React from 'react';
import Form from '../Form';
import "./Header.css";
import Present from '../Present';

class Header extends React.Component {
  render() {
  return (
    <div className="header">
    <div className="logoWrapper">
       <img 
            src={"/assets/logo.svg"}
            alt={"VOXDOXLogo"}
        /> 
      <div className="content">
          {/* passing state to children so present.js and player.js can both access it */}
        <Form  />
        <Present onUpdate={this.props.onUpdate} /> 
      </div>
    </div>
    </div>
  )
}
}
export default Header;
