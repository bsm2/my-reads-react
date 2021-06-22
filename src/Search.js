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

      componentDidMount() {
        
        BooksAPI.getAll().then((allbooks) => {
            
            this.setState(() => ({
            allbooks:allbooks
            }))
            console.log(this.state.allbooks.shelf)
           
        })
        .catch(e=>console.log(e.message))
        //   var cBook=this.state.currentlyReading.filter(b=> this.state.books.id==b.id)

        if(this.state.books ==[]){
            this.setState((prevsState)=>({
                query:prevsState.query

            }))

        }
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
        })
        
        
        
        // console.log(this.state.books.map(book=>book.shelf))

    }
    
    
    changeShelf = (result,shelf,book,currentlyReading,wantToRead,read)=>{
        book.shelf=shelf
        
        console.log(shelf)
        
        this.setState({message:`book added to ${shelf}`,shelf:shelf})
        
        
    }
     
    
    render() {
        let { books ,query,allbooks} = this.state;
       
       
        
        
        
        
           
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
                    {
                        
                       allbooks&& allbooks.map(allbook=>(
                         
                          books&&  books.map(book=>(
                            console.log( allbook.id !== book.id),
                                 allbook.id !== book.id ? book.shelf="None":book.shelf==allbook.shelf
                                 
                            ))
                            // book.id === allbook.id ? book.shelf=allbook.shelf:book.shelf="None" 
                            
                            
                        ))
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
