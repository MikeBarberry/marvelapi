import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import marvel from '../assets/marvel.jpeg';

class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            err: null,
            name: '',
            description: '',
            thumbnail: '',
            submitted: false
        }
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const hero = {
            name: this.state.name,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
        }
        axios
            .post('/api/hero/add', hero)
            .then(() => this.setState({
                submitted: true
            }))
            .catch(err => console.log(err));
    }
    
    render() {
        if (this.state.submitted) return <Redirect to="/" />
        return(
            <div className="Home Home-header">
                <img src={marvel} alt="Marvel" />
                <div className="add-container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                    Name: 
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter a character's name"
                        onChange={(event) => this.handleUserInput(event)} 
                        value={this.state.name} 
                        required />
                    </label>
                    <br />
                    <label htmlFor="description">
                    Description: 
                    <input
                        name="description"
                        type="text"
                        maxLength="120"
                        placeholder="Enter a character description"
                        onChange={(event) => this.handleUserInput(event)}
                        value={this.state.description} 
                        required />
                    </label>
                    <label htmlFor="thumbnail">
                    Thumbnail: 
                    <input
                        name="thumbnail"
                        type="text"
                        placeholder="Enter the url to an image of the character"
                        onChange={(event) => this.handleUserInput(event)} 
                        value={this.state.thumbnail} 
                        required />
                    </label>
                    <input
                        type='submit'
                    />
                </form>
                </div>
            </div>
        )
    }
}

export default Add 