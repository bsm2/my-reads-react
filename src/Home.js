import React, { Component } from 'react'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import { Link} from 'react-router-dom'

export default class Home extends Component {
    state={
        books:[],
        currentlyReading:[],
        wantToRead:[],
        read:[],
        result:[]
        

    }
    componentDidMount() {

        BooksAPI.getAll().then((books) => {
            // currentlyReading=books.filter(book=>book.shelf =="currentlyReading" )
            this.setState(() => ({
            books,
            currentlyReading:books.filter(book=>book.shelf ==="currentlyReading" ),
            wantToRead:books.filter(book=>book.shelf ==="wantToRead" ),
            read:books.filter(book=>book.shelf ==="read" )

            }))
            // console.log(this.state.read)
        });


        
    }
    changeShelf = (result,books,currentlyReading,wantToRead,read)=>{this.setState({result,books,currentlyReading,wantToRead,read})}

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <Shelf shelfTitle="Currently Reading" books={this.state.currentlyReading} changeShelf={this.changeShelf}/>
                    <Shelf shelfTitle="Want To Read" books={this.state.wantToRead} changeShelf={this.changeShelf}/>
                    <Shelf shelfTitle="Read" books={this.state.read} changeShelf={this.changeShelf}/> 
                
                </div>
                </div>
                <div className="open-search">
                    <Link to={{ pathname: '/search', state: { books:this.state.books} }} className="open-search" >Add a book</Link>
                </div>
            </div>
        )
    }
}
