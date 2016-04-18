'use strict';

var React = require('react-native');
var BookList = require('./BookList');

var {
  Component,
  NavigatorIOS,
  StyleSheet
} = React;

class Featured extends Component {
  render() {
    return(
      <NavigatorIOS
        style={featuredStyles.container}
        initialRoute={{
          title: 'Featured Books',
          component: BookList
        }}
      />
    );
  }
}

var featuredStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    fontSize: 20,
    backgroundColor: '#fff'
  }
});

module.exports = Featured;
