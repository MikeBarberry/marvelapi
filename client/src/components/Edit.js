import React from 'react';
import marvel from '../assets/marvel.jpeg';
import axios from 'axios';
import LoadIndicator from './LoadIndicator'


class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hero_id: '',
            background_thumbnail: '',
            editDescription: '',
            editThumbnail: '',
            loading: true, 
        }
    }
    componentWillMount() {
        this.setState({
            hero_id: localStorage.getItem('id')
        })
    }
    componentDidMount() {
        axios.post('api/hero/getThumbnail', {
            hero_id: this.state.hero_id,
        }).then(res => this.setState({
            background_thumbnail: res.data["thumbnail"],
            loading: false, 
        }))
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const editHero = {
            hero_id: this.state.hero_id,
            description: this.state.editDescription,
            thumbnail: this.state.editThumbnail,
        }
        axios.post('api/hero/edit',  editHero )
        .then(res => {
            console.log(res)
            console.log(res.data)
        })
        .catch(err => console.log(err));
        window.location = "/"
    }
    handleDelete = (e) => {
        e.preventDefault();
        axios.post('api/hero/delete', {
            hero_id: this.state.hero_id,
        })
        .then(res => { console.log(res) })
        window.location = "/"
    }
    render() {
        return(
            <div className="Home Home-header">
                <img src={marvel} alt="Marvel" />
                {this.state.loading ? <LoadIndicator /> :
                    <div class="edit-container" style={{ backgroundImage: `url(${this.state.background_thumbnail})` }} >
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="editDescription">
                        Edit Hero Description: 
                        <input
                            name="editDescription"
                            type="text"
                            onChange={(event) => this.handleUserInput(event)}
                            value={this.state.editDescription} 
                            required />
                        </label>
                        <label htmlFor="editThumbnail">
                        Change Thumbnail: 
                        <input
                            name="editThumbnail"
                            type="url"
                            onChange={(event) => this.handleUserInput(event)} 
                            value={this.state.editThumbnail} 
                            required />
                        </label>
                        <input
                            type='submit'
                        />
                        </form> 
                        <button class="edit-button" onClick={this.handleDelete}>Delete</button>
                    </div>
                }           
            </div>
        )
    }
}

export default Edit 