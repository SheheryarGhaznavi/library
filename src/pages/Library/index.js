import React, { Component } from 'react';
import ls from 'local-storage';
import axios from "axios";
import {
    Container,
    Grid,
    Header,
    Button,
    Item,
} from 'semantic-ui-react'

const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },
    h3: {
        marginTop: '2em',
        padding: '2em 0em',
    },
    last: {
        marginBottom: '300px',
    },
}

class Index extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
          books: [],
        };
        this.updateBook = this.updateBook.bind(this);
    };

    async componentDidMount() {
          
        try {

            this.getMovies();
            
        } catch(e) {
            // this.props.appProps.setAlert(true,e.message,"danger");
        }
    }

    updateBook(id, read) {
        
        let token = ls.get('token');

        if (token) {
            
            let body = {
                id : id,
                read : read
            };
            
            axios.post(`http://127.0.0.1:8000/api/books/update-readability`, body, { headers: { 'Authorization': `Bearer ${token}` } })
            .then( response => {
                // handle success
                this.getMovies();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }); 
        } else {
            alert('you need to login to used this functionality');
        }
    }

    getMovies() {
        let token = ls.get('token');

        if (token) {
            
            axios.get(`http://127.0.0.1:8000/api/books`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then( response => {
                // handle success
                console.log(response.data);
                this.setState({ books: response.data.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }); 
        }
    }

    render() {

        return (
            
            <div>

                <Header as='h2' content='My Library' style={style.h3} textAlign='center' />
                
                <Container>

                    {   (this.state.books).length ? 
                        <Grid container columns={3} doubling stackable >

                            {
                                (this.state.books).map((book, key) => {
                                    return (

                                        <Grid.Column key={key}>
                                            <Item.Group divided>
                                                <Item>
                                                    <Item.Image src={book.image} />
                                                    <Item.Content>
                                                        <Item.Header>{book.title}</Item.Header>
                                                        <Item.Description>
                                                            {book.author}
                                                        </Item.Description>
                                                        <Item.Description>
                                                            { (book.genre).length > 20 ? (book.genre).substring(0,20) : book.genre }
                                                        </Item.Description>
                                                        <Item.Extra>

                                                            { book.is_read ?
                                                                <Button size='small' onClick={() => {this.updateBook(book.id, false)}} color='teal'>
                                                                    Mark as UnRead
                                                                </Button> 
                                                            :
                                                                <Button size='small' onClick={() => {this.updateBook(book.id, true)}} primary>
                                                                    Mark as Read
                                                                </Button>
                                                            }
                                                        </Item.Extra>
                                                    </Item.Content>
                                                </Item>
                                            </Item.Group>
                                        </Grid.Column>

                                    )
                                }) 
                            }

                        </Grid>
                        : ''}

                        
                </Container>

            </div>
        );
    }
}

export default Index;