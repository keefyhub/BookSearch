'use strict';

var React = require('react-native');
var BookDetail = require('./BookDetail');

var {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

class SearchResults extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.books)
    };
  }

  render() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={searchResultsStyles.listView}
      />
    );
  }

  renderBook(book) {
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    return(
      <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor='#ddd'>
        <View>
          <View style={searchResultsStyles.cellContainer}>
            <Image
              source={{uri: imageURI}}
              style={searchResultsStyles.thumbnail}
            />
            <View style={searchResultsStyles.rightContainer}>
              <Text style={searchResultsStyles.title}>
                {book.volumeInfo.title}
              </Text>
              <Text style={searchResultsStyles.author}>
                {book.volumeInfo.authors}
              </Text>
            </View>
          </View>
          <View style={searchResultsStyles.divider}/>
        </View>
      </TouchableHighlight>
    );
  }

  showBookDetail(book) {
    this.props.navigator.push({
      title: book.volumeInfo.title,
      component: BookDetail,
      passProps: {book}
    });
  }
}

var searchResultsStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
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
  },
  listView: {
    backgroundColor: '#f5fcff',
  },
  cellContainer: {
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
    flex: 1,
    paddingLeft: 20
  }
});

module.exports = SearchResults;
