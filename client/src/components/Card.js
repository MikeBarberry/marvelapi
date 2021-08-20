import React from 'react'
import { Link } from 'react-router-dom';


const Card = (props) => {
    const hero = props.hero 
    return (
        <div className="card" key={hero._id}>
            <h2>{hero.name}</h2>
            <img src={hero.thumbnail} alt="hero" className="hero-image" onClick={props.toggleHidden}></img> 
            {!props.isHidden ? <p className="description">{hero.description}</p> : null }
            <Link to="/edit">
                <button className="button" id={hero._id} onClick={props.handleClick}>Edit</button>
            </Link>
        </div>
    )
}

export default Card