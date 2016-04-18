'use strict';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var BookDetail = require('./BookDetail');

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
        style={styles.listView}
      />
    );
  }

  renderBook(book) {
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    return(
      <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor='#ddd'>
        <View>
          <View style={styles.cellContainer}>
            <Image
              source={{uri: imageURI}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>
                {book.volumeInfo.title}
              </Text>
              <Text style={styles.author}>
                {book.volumeInfo.authors}
              </Text>
            </View>
          </View>
          <View style={styles.divider}/>
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

var styles = StyleSheet.create({
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
