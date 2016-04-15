'use strict';

var React = require('react-native');
var SearchBooks = require('./SearchBooks');

var {
  Component,
  NavigatorIOS,
  StyleSheet,
} = React;

var searchStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    fontSize: 20,
    backgroundColor: '#fff'
  }
});

class Search extends Component {
  render() {
    return(
      <NavigatorIOS
        style={searchStyles.container}
        initialRoute={{
          title: 'Search Books',
          component: SearchBooks
        }}
      />
    );
  }
}

module.exports = Search;
