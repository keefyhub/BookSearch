'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

var bookListStyles = StyleSheet.create({
  listView: {
    backgroundColor: '#f5fcff'
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },

  thumbnail: {
    height: 81,
    width: 53
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'right'
  },
  author: {
    color: '#656565',
    textAlign: 'right'
  },
  divider: {
    backgroundColor: '#ddd',
    height: 1
  }
});

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.items),
        isLoading: false
      });
    })
    .done();
  }

  renderLoadingView() {
    return(
      <View style={bookListStyles.loading}>

      </View>
    );
  }

  render() {
    if(this.state.isLoading) {
      return this.renderLoadingView();
    }

    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={bookListStyles.listView}
      />
    );
  }

  renderBook(book) {
    return(
      <TouchableHighlight>
        <View>
          <View style={bookListStyles.container}>
            <Image
            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
            style={bookListStyles.thumbnail}
            />
            <View style={bookListStyles.rightContainer}>
              <Text style={bookListStyles.title}>
                {book.volumeInfo.title}
              </Text>
              <Text style={bookListStyles.author}>
                {book.volumeInfo.authors}
              </Text>
            </View>
          </View>
          <View style={bookListStyles.divider}/>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = BookList;
