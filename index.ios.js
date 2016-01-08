/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var Login = require('./login');
var AppContainer = require('./AppContainer');

var GithubBrowser = React.createClass({

  componentDidMount: function() {

      var AuthService = require( './AuthService' );
      AuthService.getAuthInfo( ( authInfo ) => {

          this.setState({
              checkingAuth: false
          });

          if( !authInfo.error ) {
              this.setState({
                  isLoggedIn: true
              });
          } else {
              this.setState({
                  isLoggedIn: false

              });
          }

      })

  },

  getInitialState: function() {
    return {
        isLoggedIn: false,
        checkingAuth: true
    }
  },
  render: function() {

    if( this.state.checkingAuth ) {
        return (
            <View style={ styles.container }>
                <ActivityIndicatorIOS animating={ true } size='large'>
                </ActivityIndicatorIOS>
            </View>
        )
    }

    if( this.state.isLoggedIn ) {
        return (
            <AppContainer></AppContainer>
        )
    } else {
        return (
          <Login onLogin={ this.onLogin }></Login>
        );
    }
  },
  onLogin: function() {
      this.setState({
          isLoggedIn: true
      });
  }
});

var styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
