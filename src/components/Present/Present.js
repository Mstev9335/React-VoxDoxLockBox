import React from 'react';
import "./Present.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Proj = props => (
  <tr>
    <td>{props.proj.proj_title}</td>
    <td>{props.proj.proj_description}</td>
    <td>{props.proj.proj_URL}</td>
    {/* <td>
      <Link to={'/edit/' + props.proj._id}>EDIT</Link>
    </td> */}
    <td>
    <button className="selectBtn" value={props.proj.proj_URL} type="submit">Select</button> 
    </td>
    <td>
    <button className="deleteBtn" type="submit" >Delete</button> 
    </td>
    
  </tr>
)

class Present extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projs: [],
      btnVal: ''
    }
  }

  // fileSelect = event => {
  //   // console.log(event.target.files[0]);
  //   this.setState({
  //     btnVal: "testing",
     
  //   })

  // }

  componentDidMount() {
    axios.get('http://localhost:2112/projs/')
        .then(response => {
          this.setState({
            projs: response.data,
            btnVal: response.data.proj_URL
          });
        })
        .catch(function (err) {
          console.log(err);
        })
  }

  projList() {
    return this.state.projs.map(function(currentProj, i) {
      return <Proj proj={currentProj} key={i} />
    })
  }

  render() {
    return (
      <div className="projView">
        <h3>Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Notes</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            { this.projList() }
          </tbody>
        </table>
      </div>
    )
  }
}

  export default Present;
