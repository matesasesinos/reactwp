import React, { Component } from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.scss';
import Loader from '../assets/static/tenor.gif';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            posts: [],
            error: ''
        }
    }

    componentDidMount() {
        const wordPressSiteUrl = process.env.REACT_APP_API_URL;
        this.setState({ loading: true }, () => {
            axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/`)
                .then(res => {
                    this.setState({ loading: false, posts: res.data })
                })
                .catch(error => this.setState({ loading: false, error: error.response.data.message }))

        })
    }

    render() {

        const { posts, loading, error } = this.state;

        return (
            <div>
                <Navbar />
                {error && <div>un error: {error}</div>}
                <div>
                    {posts.length ? (
                        <div>
                            {posts.map(post => (
                                <div key={post.id}>
                                    <h1>
                                        <Link to={`/post/${post.id}-${post.slug}`}>
                                            {post.title.rendered}
                                        </Link>
                                        {renderHTML(post.excerpt.rendered)}
                                        {post.featured_image_url ? (<img src={post.featured_image_url} alt={post.title.rendered} />) : ''}
                                        <br />
                                        {post.acf.acf_rest_api_field ? (
                                            `este es el acf: ${post.acf.acf_rest_api_field}`
                                        ) : ''}
                                        <br />
                                        {post.acf.otro_campo ? (
                                            post.acf.otro_campo.map(otro => {
                                                return (
                                                    `Campo1: ${otro.campo_1}Campo 2:${otro.campo_2}`
                                                )
                                            })
                                        ) : ''}

                                        <p>
                                            <Link to={`/post/${post.id}-${post.slug}`} className="elboto">Ver el post</Link>
                                        </p>
                                    </h1>
                                </div>
                            ))}
                        </div>
                    ) : ''}
                    {loading && <img src={Loader} alt="cargando" className="loader" />}
                </div>
            </div>
        )
    }

}

export default Home;