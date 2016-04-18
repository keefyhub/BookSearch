'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');

var {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookTitle: '',
      isLoading: false,
      errorMessage: ''
    };
  }

  bookTitleInput(event) {
    this.setState({bookTitle: event.nativeEvent.text});
  }

  bookAuthorInput(event) {
    this.setState({bookAuthor: event.nativeEvent.text});
  }

  fetchData() {
    this.setState({isLoading: true});
  }

  searchBooks() {
    this.fetchData();

    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

    if(this.state.bookTitle !== '') {
      baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
    }

    if(this.state.bookAuthor !== '') {
      baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
    }

    fetch(baseURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({isLoading: false});
        if(responseData.items) {
          this.props.navigator.push({
            title: 'Search Results',
            component: SearchResults,
            passProps: {books: responseData.items}
          });
        } else {
          this.setState({ errorMessage: 'No results found'});
        }
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          errorMessage: error
        })
      ).done();
  }

  render() {
    var spinner = this.state.isLoading ?
      (<ActivityIndicatorIOS hidden='true' size='large' />) : (<View/>);
    return(
      <View style={searchBooksStyles.container}>
        <Text style={searchBooksStyles.instructions}>
          Search by book title and/or author
        </Text>
        <View>
          <Text style={searchBooksStyles.fieldLabel}>
            Book Title:
          </Text>
          <TextInput style={searchBooksStyles.searchInput} onChange={this.bookTitleInput.bind(this)}/>
        </View>
        <View>
          <Text style={searchBooksStyles.fieldLabel}>
            Author:
          </Text>
          <TextInput style={searchBooksStyles.searchInput} onChange={this.bookAuthorInput.bind(this)}/>
        </View>
        <TouchableHighlight
          style={searchBooksStyles.button}
          underlayColor='#f1c40f'
          onPress={this.searchBooks.bind(this)}>
          <Text style={searchBooksStyles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
        {spinner}
        <Text style={searchBooksStyles.errorMessage}>
          {this.state.errorMessage}
        </Text>
      </View>
    );
  }
}

var searchBooksStyles = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10
  },
  searchInput: {
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    fontSize: 18,
    height: 36,
    marginBottom: 10,
    marginTop: 10,
    padding: 5
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18
  },
  instructions: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  fieldLabel: {
    fontSize: 15,
    marginBottom: 15
  },
  errorMessage: {
    alignSelf: 'center',
    color: '#F34334',
    fontSize: 15,
    marginTop: 15
  }
});

module.exports = SearchBooks;
