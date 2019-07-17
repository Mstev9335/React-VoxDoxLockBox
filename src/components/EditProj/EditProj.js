import React from 'react';
import axios from 'axios';

export default class EditProj extends Component {

    constructor(props) {
        super(props);

        this.onChangeProjTitle = this.onChangeProjTitle.bind(this);
        this.onChangeProjDescription = this.onChangeProjDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            proj_title: '',
            proj_description: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:2112/projs/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    proj_title: response.data.proj_title,
                    proj_description: response.data.proj_description
                })
            })
            .catch(function(err) {
                console.log(err)
            })
    }
    
    onChangeProjTitle(e) {
        this.setState({
            proj_title: e.target.value
        });
    }

    onChangeProjDescription(e) {
        this.setState({
            proj_description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            proj_title: this.state.proj_title,
            proj_description: this.state.proj_description
        };
        axios.post('http://localhost:2112/projs/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return(
            <div>
                <h3>UPDATE PROJECTS</h3>
                <form className="uploadForm" onSubmit={this.onSubmit}>
                    <div className="row">
                        <label>Title: </label>
                        <input      type="text"
                                    value={this.state.proj_title}
                                    onChange={this.onChangeProjTitle}
                                    />
                    </div>
                    <div className="row">
                        <label>Notes: </label>
                        <input      type="text"
                                    value={this.state.proj_description}
                                    onChange={this.onChangeProjDescription}
                                    />
                    </div>

                    <div >
                        <button type="submit" value="Update" className="submitBtn"></button>
                    </div>
                </form>
            </div>
        )}
}