import React from 'react';
import "./Present.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table'


let url;
const Proj = props => (
  <tr>
    <td>{props.proj.proj_title}</td>
    <td>{props.proj.proj_description}</td>
    <td>{props.proj.proj_url}</td>
    <td>
      <Link to={'/edit/' + props.proj._id}>EDIT</Link>
    </td>
    <td>
      <button value={props.proj.proj_URL} onClick={
        function getFile(){
       url = props.proj.proj_URL;
        console.log(url);
      // this.setState({source: props.proj.proj_URL})
      return url;
      // onChange={.handleUrlChange}
      }}
      >Select</button>
    </td>
  </tr>
)
console.log(url);
class Present extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      projs: [],
      selectedUrl: url
     };

  }

//   handleUrlChange = () => {
//     // var fileUrl = this.state.selectedUrl;
//     var fileUrl = "https://voxdox.s3.us-east-2.amazonaws.com/Immigrant+Song+(2007+Remaster).mp3";
//     this.props.onSelectLanguage({selectedUrl: fileUrl});   
//     // this.props.onSelectLanguage(fileUrl);   
       
// }
// buttonClick=()=>{
//   this.props.onSelectedUrl(url);
// }
// handleLangChange: function (e) {
//   var lang = this.state.selectedLanguage;
//   var code = this.state.selectedCode;
//   this.props.onSelectLanguage({selectedLanguage: lang});   
//   this.props.onSelectLanguage({selectedCode: code});           
// }


  componentDidMount() {
    axios.get('http://localhost:2112/projs/')
      .then(response => {
        this.setState({ projs: response.data });
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  // this.onClick = this.onClick.bind(this);


  projList() {
    return this.state.projs.map(function (currentProj, i) {
      return ( <Proj proj={currentProj} key={i} />)
        
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
            {this.projList()}

{/* <button onClick={this.buttonClick}>Put</button> */}
{/* <button onClick={this.props.data(this.state.selectedUrl)}>Click me</button><span>{this.state.selectedUrl}</span> */}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Present;
