import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Loader from '../assets/static/tenor.gif';

class SinglePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            post: {},
            error: '',
        }
    }


    componentDidMount() {
        console.log(this.props.match.params);
        const { id } = this.props.match.params;
        const wordPressSiteUrl = process.env.REACT_APP_API_URL;
        this.setState({ loading: true }, () => {
            axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${id}`)
                .then(res => {
                    this.setState({ loading: false, post: res.data });
                })
                .catch(error => this.setState({ loading: false, error: error.response.data.message }))

        })
    }

    render() {
        const { post, error, loading } = this.state;
        return (
            <div>
                <Navbar />
                {error && <div>un error: {error}</div>}
                <div>
                    {Object.keys(post).length ? (
                        <div>

                            <div key={post.id}>
                                <h1> {post.title.rendered} </h1>
                                {renderHTML(post.content.rendered)}
                            </div>

                        </div>
                    ) : ''}
                    {loading && <img src={Loader} alt="cargando" className="loader" />}
                </div>
            </div>
        )
    }

}

export default SinglePost;