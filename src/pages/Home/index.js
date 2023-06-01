import React, { Component } from 'react';
import Library from './../Library';
import Menu from './../Menu';

class Index extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
          books: [],
        };
    };

    render() {

        return (
            
            <div>

                <Menu />

                <Library />

            </div>
        );
    }
}

export default Index;