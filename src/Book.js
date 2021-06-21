import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

export default class Book extends Component {
    state={
        books:[],
        currentlyReading:[],
        wantToRead:[],
        read:[]
    }
    handleChange =async(e)=>{
        const shelf = e.target.value
        const book =this.props.book
        const id = this.props.key
        console.log(book)
        console.log(shelf)
        
        BooksAPI.update(book,shelf).then((result) => {
            
            BooksAPI.getAll().then((books) => {
            
                this.setState(() => ({
                    books,
                    currentlyReading:books.filter(book=>book.shelf ==="currentlyReading" ),
                    wantToRead:books.filter(book=>book.shelf ==="wantToRead" ),
                    read:books.filter(book=>book.shelf ==="read" )
                }))
                this.props.changeShelf(result,books,this.state.currentlyReading,this.state.wantToRead,this.state.read)
            });
           
            

        }).catch(err=>console.log(err))

        
        
        

    }
    // componentDidMount(){
       
    // }
    
    
    render() {
        return (
            
            <div>
            
                <li>
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.image}")` }}></div>
                        <div className="book-shelf-changer" >
                            
                            <select name="changer" value={this.props.shelf} onChange={this.handleChange} >                               
                                <option value="move" >Move to...</option>
                                
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors}</div>
                    </div>
                </li>
            
            </div>
        )
    }
}
