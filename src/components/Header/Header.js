import React from 'react';
import Form from '../Form';
import "./Header.css";
import Present from '../Present';



class Header extends React.Component {
  state = {
    url: '',
  }

  // callback function to get url from child
  // handleUrl = (urlValue) => {
  //   this.setState({ url: urlValue });
  //   console.log(this.state.url);
  // }
  update(value){
    return () => {
       this.setState({
         url: value
       });
    }
  }


  render() {
    console.log()
    return (
      <div className="header">
        c
    <div className="logoWrapper">
          <img
            src={"/assets/logo.svg"}
            alt={"VOXDOXLogo"}
          />

          <div className="content">
            {/* passing state to children so present.js and player.js can both access it */}
            <Form />
            <Present onUpdate={this.props.onUpdate} />
            {/* <Present onSelectedUrl={this.handleUrl} /> */}
            <Present data={this.update.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
export default Header;
