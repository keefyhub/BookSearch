'use strict';

import React, {
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

var SearchBooks = require('./SearchBooks');

class Search extends Component {
  render() {
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Search Books',
          component: SearchBooks
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    fontSize: 20,
    backgroundColor: '#fff'
  }
});


module.exports = Search;
