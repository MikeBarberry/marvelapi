import React from 'react';
import axios from 'axios';
import marvel from '../marvel.jpeg';

class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            err: null,
            name: '',
            description: '',
            thumbnail: '',
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
        axios.post('api/hero/add_hero',  hero )
        .then(res => {
            console.log(res)
            console.log(res.data)
        })
        .catch(err => console.log(err));
        window.location = "/"
    }
    render() {
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
                        onChange={(event) => this.handleUserInput(event)}
                        value={this.state.description} 
                        required />
                    </label>
                    <label htmlFor="thumbnail">
                    Thumbnail: 
                    <input
                        name="thumbnail"
                        type="text"
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