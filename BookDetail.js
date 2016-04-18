'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

class BookDeatil extends Component {
  render() {
    var book = this.props.book;
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : 'no description available';
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 75
  },
  image: {
    height: 165,
    padding: 10,
    width: 107
  },
  description: {
    color: '#656565',
    fontSize: 15,
    padding: 10
  }
});

module.exports = BookDeatil;
