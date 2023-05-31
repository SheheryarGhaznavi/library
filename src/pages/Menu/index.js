import React, { Component } from 'react';
import {
    Container,
    Menu,
} from 'semantic-ui-react'

class Index extends Component {

    render() {

        return (
            
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        
                        <Menu.Item header>
                            Books Library
                        </Menu.Item>
                        
                    </Container>
                </Menu>

            </div>
        );
    }
}

export default Index;