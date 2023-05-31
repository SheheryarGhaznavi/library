import React, { Component } from 'react';
import axios from "axios";
import {
    Container,
    Menu,
    Search,
    Grid,
} from 'semantic-ui-react'

class Index extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          books: [],
          loading : false
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
    };

    handleSearchChange(event, value) {
        console.log("value");
        console.log(value);
        this.setState({loading: true});
        // console.log(this.state.books);

        axios.get(`https://openlibrary.org/search.json?q=${value.value}&fields=title,author_name,subject&limit=5`)
        .then( response => {
            // handle success
            this.parseBooks(response.data.docs);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });        
        
    }


    parseBooks(data) {
        console.log("in parse");
        let books = [];

        data.forEach( (element,key) => {
            books.push({
                key : key+1, 
                title : element.title, 
                author : element.author_name[0], 
                genre : (element.subject ? (element.subject).join(', ') : null), 
                image : "https://react.semantic-ui.com/images/wireframe/image.png",
            });
        });

        this.setState({
            books: books,
            loading: false
        });
    }



    resultSelected(value) {
        console.log("result selected");
        console.log(value);
    }


    render() {

        return (
            
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        
                        <Menu.Item header>
                            Books Library
                        </Menu.Item>

                        <Menu.Menu position='right'>

                            <Menu.Item>
                                <Grid>
                                    <Grid.Column width={6}>
                                        <Search
                                            loading={this.state.loading}
                                            placeholder='Search Books...'
                                            onResultSelect={(e, data) =>
                                                this.resultSelected(data.result)
                                            }
                                            onSearchChange={this.handleSearchChange}
                                            results={this.state.books}
                                        />
                                    </Grid.Column>

                                </Grid>
                            </Menu.Item>

                        </Menu.Menu>

                        
                    </Container>
                </Menu>

            </div>
        );
    }
}

export default Index;