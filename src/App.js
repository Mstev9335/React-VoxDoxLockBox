import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
// import EditProj from './components/EditProj';
import TapeDeck from './components/TapeDeck/TapeDeck';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'testing',
      url: ''
    };
  }
  onUpdate = (val) => {
    this.setState({
      source: val,
      url: ''
    })
    console.log(this.source);
  };

  // callback function to get url from child
  // handleUrl = (urlValue) => {
  //   this.setState({ url: urlValue });
  // }
  render() {

    return (
      <Router>
        {/* <div className="col-sm-9" >
          <SelectLanguage onSelectLanguage={this.handleLanguage} />
        </div> */}
        {/* passing state to children so present.js and player.js can both access it */}

        <Header onUpdate={this.onUpdate} />
        {/* <Header onSelectedUrl={this.handleUrl} /> */}

        <TapeDeck passedVal={this.state.source} />

        <div className="grid-container">
          {/* <Header />
          <TapeDeck /> */}
        </div>
        {/* <Link to="/edit/:id">EDIT ROUTE</Link> */}
        {/* <Route path="/edit/:id" component={EditProj} /> */}
      </Router>
    )
  }
}
export default App;
