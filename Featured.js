'use strict';

import React, {
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

var BookList = require('./BookList');

class Featured extends Component {
  render() {
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Featured Books',
          component: BookList
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

module.exports = Featured;
