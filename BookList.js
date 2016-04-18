'use strict';

import React, {
  ActivityIndicatorIOS,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var BookDetail = require('./BookDetail');

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fantasy';

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
      <View style={styles.loading}>

      </View>
    );
  }

  showBookDetail(book) {
    this.props.navigator.push({
      title: book.volumeInfo.title,
      component: BookDetail,
      passProps: {book}
    });
  }

  render() {
    if(this.state.isLoading) {
      return this.renderLoadingView();
    }

    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderBook(book) {
    return(
      <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor='#ddd'>
        <View>
          <View style={styles.container}>
            <Image
            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
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
}

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#f5fcff',
    marginBottom: 50,
    marginTop: 65
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
    flex: 1,
    paddingLeft: 20
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

module.exports = BookList;
