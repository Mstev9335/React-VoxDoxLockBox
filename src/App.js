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
      source: 'testing'
    };
  }
  onUpdate = (val) => {
    this.setState({
      source: val
    })
    console.log(this.source);
  };
 
  render() {

    return (
      <Router>

        {/* passing state to children so present.js and player.js can both access it */}
        <Header onUpdate={this.onUpdate} />
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
