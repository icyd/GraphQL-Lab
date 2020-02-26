from flask import Blueprint, request, jsonify
from ariadne.constants import PLAYGROUND_HTML
from ariadne import (
    ObjectType,
    graphql_sync,
    make_executable_schema
)
from models.author import Author
from models.book import Book

api = Blueprint('graphql', __name__)

type_defs = """
    type Book {
        id: ID
        name: String
        genre: String
        author: Author
    }
    type Author {
        id: ID
        name: String
        age: Int
        books: [Book]
    }
    type Query {
        book(id: ID!): Book
        author(id: ID!): Author
        books: [Book]
        authors: [Author]
    }
    type Mutation {
        addBook(
            name: String!
            genre: String!
            authorId: ID!
        ): Book
        addAuthor(
            name: String!
            age: Int!
        ): Author
    }
"""

book = ObjectType('Book')
author = ObjectType('Author')
query = ObjectType('Query')
mutation = ObjectType('Mutation')


@book.field('author')
def resolve_author_book(obj, *_):
    return Author.objects.get(id=obj.authorId)


@author.field('books')
def resolve_books_author(obj, *_):
    return Book.objects(authorId=str(obj.id))


@query.field('book')
def resolve_book_query(_, info, id):
    return Book.objects.get(id=id)


@query.field('author')
def resolve_author_query(_, info, id):
    return Author.objects.get(id=id)


@query.field('books')
def resolve_books_query(*_):
    return Book.objects


@query.field('authors')
def resolve_authors_query(*_):
    return Author.objects


@mutation.field('addBook')
def add_book(_, info, name, genre, authorId):
    book = Book(name=name, genre=genre, authorId=authorId)
    return book.save()


@mutation.field('addAuthor')
def add_author(obj, info, name, age):
    author = Author(name=name, age=age)
    return author.save()


schema = make_executable_schema(type_defs, [query, author, book, mutation])


@api.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@api.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    print(data)

    success, result = graphql_sync(
        schema,
        data)

    status_code = 200 if success else 400
    return jsonify(result), status_code
