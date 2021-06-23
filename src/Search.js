import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link} from 'react-router-dom'
import Book from './Book'

export default class Search extends Component {
    state={
        query:'',
        books:[],
        shelf:"",
        allbooks:[],
        book:{}

    }

      componentDidMount() {
        
       
      
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
    
    
    changeSshelf = async (result,shelf,book,currentlyReading,wantToRead,read)=>{
        let {books}=this.state
        await books.map(b=>{
            book.id===b.id? b.shelf=shelf : b.shelf="None"
            console.log( b.shelf)
            
        })
           
            
          this.setState({shelf,books})
        console.log(books)
        
        
    }
     
    
    render() {
        let { books ,query,allbooks} = this.state;
        // let {allbooks} = this.props.location.state
        

        //console.log(allbooks)
        
      
        

        
          
       
        
        
        
        
           
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
                    <div>{console.log(this.state.message)}</div>
                    { 
                        books&& books.map((book)=>{
                            let findedBook= allbooks.find(allbook=>book.id===allbook.id)
                            findedBook? book.shelf = findedBook.shelf:book.shelf ="None"
                          }
                              
                              )
                        
                    }
                <ol className="books-grid">
                {
                    
                    books && books.map((book ) => (
                        
                        book.imageLinks && <Book key={book.id} title={book.title} authors={book.authors} image={book.imageLinks.thumbnail} book={book} changeShelf={this.changeSshelf} shelf={book.shelf} />
                        
                        ))}
                </ol>
                </div>
               
            </div>
            
        )
    }
}
