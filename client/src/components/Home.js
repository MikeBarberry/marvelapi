import React from 'react';
import axios from 'axios';
import styled from "styled-components";
import marvel from '../assets/marvel.jpeg';
import { Link } from 'react-router-dom';
import LoadIndicator from './LoadIndicator'

const Button = styled.button`
  background-color: #404040;
  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: Arial;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  position: absolute;
  top: 100px;
  right: 85px;
  &:hover {
    opacity: .5;
  };
`;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            heroes: [],
            isHidden: true,
            loading: true,
        }
    }
    handleClick = (e) => {
        const id = e.target.id;
        localStorage.setItem("id", id);
    }
    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    componentDidMount() {
        axios.post("/api/hero/hero_list").then(res => {
            this.setState({ 
                heroes: res.data,
                loading: false,
            })
        })
    }
    render() {
        return(
            <div className="Home Home-header">
                <img src={marvel} alt="Marvel" />
                <Link to="/add">
                    <Button>Add</Button>
                </Link>
                {this.state.loading ? <LoadIndicator /> :
                    <div className="hero-list">
                        {this.state.heroes.map(hero => 
                            <div class="card">
                                <h2>{hero.name}</h2>
                                <img src={hero.thumbnail} alt="hero" class="hero-image" onClick={this.toggleHidden}></img> 
                                {!this.state.isHidden ? <p class="description">{hero.description}</p> : null }
                                <Link to="/edit">
                                    <button class="button" id={hero._id} onClick={this.handleClick}>Edit</button>
                                </Link>
                            </div>
                        )}
                    </div>
                }
            </div>
                      
        )
    }
}

export default Home 

// can add loading icons and form validation 