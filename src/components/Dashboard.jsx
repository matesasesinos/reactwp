import React, { Component } from 'react';
import Navbar from './Navbar';

class Dashboard extends Component {
    render() {
        const userName = localStorage.getItem( 'userName');
        console.log(this.props);
        return (
            <div>
                <Navbar />
                <h1>Hola {userName}</h1>
            </div>
        )
    }
}

export default Dashboard;