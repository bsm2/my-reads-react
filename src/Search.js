import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link} from 'react-router-dom'
import Book from './Book'

export default class Search extends Component {
    state={
        query:'',
        books:[],

    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
        BooksAPI.search(query).then((books) => {
            console.log(books)
            this.setState(() => ({
                books
            }))
        })
        console.log(this.state.books)

    }
    changeShelf = (result,books,currentlyReading,wantToRead,read)=>{this.setState({message:'book added'})}
    
    render() {
        let { books ,query} = this.state;
        return (
            
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        
                    
                    />

                </div>
                </div>
                <div className="search-books-results">
                    <div>{this.state.message}</div>
                <ol className="books-grid">
                {
                    
                    books && books.map(book => ( <Book key={book.id} title={book.title} authors={book.authors} image={book.imageLinks.thumbnail} book={book} changeShelf={this.changeShelf} shelf={book.shelf}/>))
                }
                </ol>
                </div>
               
            </div>
            
        )
    }
}
