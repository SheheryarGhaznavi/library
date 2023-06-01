import React, { Component } from 'react';
import axios from "axios";
import ls from 'local-storage';
import {
    Container,
    Menu,
    Search,
    Grid,
    Modal,
    Button,
    Icon,
    Header,
    Form,
    Input,
} from 'semantic-ui-react'

class Index extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          books: [],
          loading : false,
          open : false,
          email : "",
          password : "",
          token : ls.get('token'),
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.login = this.login.bind(this);
    };

    handleSearchChange(event, value) {

        this.setState({loading: true});

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

    openLoginModal() {
        this.setState({open: true});
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



    resultSelected(book) {

        let token = ls.get('token');

        if (token) {
            
            let body = {
                title : book.title,
                author : book.author,
                genre : book.genre,
                image : book.image
            };
    
            axios.post(`http://127.0.0.1:8000/api/books/create`, body, { headers: { 'Authorization': `Bearer ${token}` } })
            .then( response => {
                // handle success
                console.log(response);
                alert(response.data.message);
                window.location.reload();
            })
            .catch(function (error) {
                // handle error
                alert(error.response.data.message);
            });

        } else {
            alert('you need to login first to add this book ');
        }

    }



    login() {

        axios.get(`http://127.0.0.1:8000/sanctum/csrf-cookie`)
        .then( response => {
            // handle success

            let body = {
                email : this.state.email,
                password : this.state.password
            }

            axios.post(`http://127.0.0.1:8000/api/auth/login`, body)
            .then( response => {
                // handle success
                console.log(response);
                this.setState({open: false});
                ls.set('token', response.data.data.token);
                window.location.reload();

            })
            .catch(function (error) {
                // handle error
                alert(error.response.data.message);
            });  

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });  
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

                        {this.state.token ? '' : <Menu.Item name='login' onClick={this.openLoginModal} /> }

                    </Container>
                </Menu>



                <Modal
                    basic
                    onClose={() => this.setState({open: false}) }
                    onOpen={() => this.setState({open: true})}
                    open={this.state.open}
                    size='small'
                    >
                    <Header icon>
                        <Icon name='archive' />
                        Login
                    </Header>
                    <Modal.Content>
                        
                        <Form>
                            <Form.Field>
                                <Input type='email' value={this.state.email} onChange={(e, target) => this.setState({email: target.value})} label='Email' placeholder='abc@gmail.com' />
                            </Form.Field>
                            <Form.Field>
                                <Input type='password' value={this.state.password} onChange={(e, target) => this.setState({password: target.value})} label='Password' placeholder='*******' />
                            </Form.Field>
                            <Button color='green' inverted type='submit' onClick={this.login}>Login</Button>
                            <Button color='red' inverted onClick={() => this.setState({open: false})}>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

            </div>
        );
    }
}

export default Index;