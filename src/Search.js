import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link} from 'react-router-dom'
import Book from './Book'

export default class Search extends Component {
    state={
        query:'',
        books:[],
        shelf:"",
        allbooks:[]

    }

      componentWillMount() {
        
       
      
        BooksAPI.getAll().then((allbooks) => {
            
            this.setState((prevState) => ({
            allbooks,
            query:prevState.query
            
            }))
            console.log(this.state.query)
           
        })
        .catch(e=>console.log(e.message))

    }



    
    
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
        BooksAPI.search(query.trim()).then((books) => {
            console.log(books)
            this.setState(() => ({
                books
            }))
        }).catch(e=>console.log(e))
        
        // console.log(this.state.books.map(book=>book.shelf))

    }
    
    
    changeShelf = (result,shelf,book,currentlyReading,wantToRead,read)=>{
        //book.shelf=shelf
        
        console.log(shelf)
        
        this.setState({message:`book added to ${shelf}`,shelf:shelf})
        
        
    }
     
    
    render() {
        let { books ,query,allbooks} = this.state;

        console.log(this.state.allbooks)
        
          
       
        
        
        
        
           
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
                    <div>{console.log(this.state.allbooks.shelf)}</div>
                    { console.log(this.state.allbooks.shelf),
                        allbooks&& allbooks.map(allbook=>
                            (books&&  books.map(book=>
                            
                            (book.id === allbook.id ?  book.shelf=allbook.shelf:book.shelf="None"))))
                      
                        
                        
                    }
                <ol className="books-grid">
                {
                    
                    books && books.map((book ) => (
                        
                        book.imageLinks && <Book key={book.id} title={book.title} authors={book.authors} image={book.imageLinks.thumbnail} book={book} changeShelf={this.changeShelf} shelf={book.shelf} />
                        
                        ))}
                </ol>
                </div>
               
            </div>
            
        )
    }
}
