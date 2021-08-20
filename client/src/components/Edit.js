import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import LoadIndicator from './LoadIndicator'
import marvel from '../assets/marvel.jpeg';

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hero_id: '',
            background_thumbnail: '',
            editDescription: '',
            editThumbnail: '',
            loading: true, 
            submitted: false,
        }
    }
    componentWillMount() {
        this.setState({
            hero_id: localStorage.getItem('id')
        })
    }

    componentDidMount() {
        axios
            .post('/api/hero/getThumbnail', { hero_id: this.state.hero_id })
            .then(res => this.setState({
                background_thumbnail: res.data["thumbnail"],
                editDescription: res.data["description"],
                editThumbnail: res.data["thumbnail"],
                loading: false, 
            }))
            .catch(err => console.log(err));
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    onFinish = (form_values) => {
        const { hero_id } = this.state
        const request = { hero_id: hero_id, ...form_values }

        axios
            .post('/api/hero/edit',  request)
            .then(() => {
                this.setState({
                    submitted: true
                })
            })
            .catch(err => console.log(err));

    }

    handleDelete = (e) => {
        e.preventDefault();
        axios
            .post('/api/hero/delete', { hero_id: this.state.hero_id })
            .then(() => this.setState({
                submitted: true
            })
            )
            .catch(err => console.log(err));
    }

    clearThumbnail = (e) => {
        e.preventDefault();
        this.setState({
            editThumbnail: ""
        })
    }

    clearDescription = (e) => {
        e.preventDefault();
        this.setState({
            editDescription: ""
        })
    }

    render() {
        if (this.state.submitted) return <Redirect to="/" />
        return(
            <div className="Home Home-header">
                <img src={marvel} alt="Marvel" />
                {this.state.loading ? <LoadIndicator /> :
                    <div className="edit-container" style={{ backgroundImage: `url(${this.state.background_thumbnail})` }} >
                        <Form onFinish={this.onFinish} >
                            <Form.Item
                                name="description"
                                label="Edit Hero Description"
                                initialValue={this.state.editDescription}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="thumbnail"
                                label="Change Thumbnail"
                                initialValue={this.state.editThumbnail}
                            >
                                <Input type="url" />
                            </Form.Item>
                            <Form.Item>
                                <Button className="edit-button" type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                        <button className="edit-button" onClick={this.handleDelete}>Delete</button>
                    </div>
                }           
            </div>
        )
    }
}

export default Edit 