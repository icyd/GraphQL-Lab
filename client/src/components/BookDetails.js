import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2 className="font-bold">Name</h2>
          <h3>{book.name}</h3>
          <h2 className="font-bold mt-4">Genre</h2>
          <p>{book.genre}</p>
          <h2 className="font-bold mt-4">Author's name</h2>
          <p>{book.author.name}</p>
          <h2 className="font-bold mt-4">All books by this author</h2>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      );
    } else {
      return <p>No book selected</p>
    }
  }

  render() {
    return(
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      }
    }
  }
}
)(BookDetails);
