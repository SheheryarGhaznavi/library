import React, { Component } from 'react';
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
    };

    async componentDidMount() {
          
        try {

            let books = [
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                },
                {
                    "title" : "Book 1",
                    "author" : "Author 1",
                    "genre" : "Genre 1, Genre 2",
                    "image" : "https://react.semantic-ui.com/images/wireframe/image.png",
                    "read" : true,
                }
            ];
            
            this.setState({
                books: books,
            });

        } catch(e) {
            // this.props.appProps.setAlert(true,e.message,"danger");
        }
    }

    render() {

        return (
            
            <div>

                <Header as='h2' content='My Library' style={style.h3} textAlign='center' />
                
                <Container>

                    <Grid container columns={3} divided='vertically' celled >

                        {
                            this.state.books.map((book, key) => {
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
                                                        {book.genre}
                                                    </Item.Description>
                                                    <Item.Extra>

                                                        { book.read ?
                                                            <Button size='small' color='teal'>
                                                                Mark as UnRead
                                                            </Button> 
                                                        :
                                                            <Button size='small' primary>
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

                        
                </Container>

            </div>
        );
    }
}

export default Index;