import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }
  displayAuthors() {
    const { getAuthorsQuery } = this.props;

    if (getAuthorsQuery.loading) {
      return <option>Loading...</option>;
    } else {
      let authors = [<option key="0" value={null}>Select author</option>];
      authors = authors.concat(getAuthorsQuery.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>;
      }));
      return authors;
    }
  }

  submitForm = (event) => {
    const { addBookMutation } = this.props;
    const { name, genre, authorId } = this.state;

    addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    event.preventDefault();
  }

  render() {
    return(
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input text="text" onChange={e => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input text="text" onChange={e => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={ e => this.setState({authorId: e.target.value}) }>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'}),
)(AddBook);
