'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} = React;

class BookDeatil extends Component {
  render() {
    var book = this.props.book;
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : 'no description available';
    return(
      <View style={bookDetailStyles.container}>
        <Image style={bookDetailStyles.image} source={{uri: imageURI}} />
        <Text style={bookDetailStyles.description}>{description}</Text>
      </View>
    );
  }
}

var bookDetailStyles = StyleSheet.create({
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
