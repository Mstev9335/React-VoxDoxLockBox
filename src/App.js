import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
// import EditProj from './components/EditProj';
// import TapeDeck from './components/TapeDeck/TapeDeck';
import './App.css';
import Present from './components/Present';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <Header />
          {/* <TapeDeck /> */}
        </div>
        {/* <Link to="/edit/:id">EDIT ROUTE</Link> */}
        {/* <Route path="/edit/:id" component={EditProj} /> */}
      </Router>
    )
  }
}
export default App;
