'use strict';
var React = require('react-native');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Component,
    ActivityIndicatorIOS
    } = React;

var Display = require('./Display');

class Login extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            username: '',
            password: '',
            showUsernameError: false,
            showPasswordError: false,
            showProgress: false,
            showCredentialsError: false,
            successLogin: false
        };
    }

    render() {
        return (
          <View style={ styles.container }>
              <Image style={ styles.logo } source={ require('image!Octocat') }></Image>
              <Text style={ styles.heading }>
                  Github Browser
              </Text>
              <TextInput onChangeText={ ( text ) => this.setState({ username: text, showUsernameError: false, showPasswordError: false, showCredentialsError: false, successLogin: false }) } style={ styles.input } placeholder="Github Username"></TextInput>
              <TextInput onChangeText={ ( text ) => this.setState({ password: text, showUsernameError: false, showPasswordError: false, showCredentialsError: false, successLogin: false }) } style={ styles.input } placeholder="Github Password" secureTextEntry={ true }></TextInput>
              <TouchableHighlight onPress={ this.onLoginPressed.bind( this ) } style={ styles.button }>
                <Text style={ styles.buttonText }>
                    Log in
                </Text>
              </TouchableHighlight>

              <Display type="error" if={ this.state.showCredentialsError }>
                  Incorrect username or password
              </Display>

              <Display type="error" if={ this.state.showUsernameError }>
                Please Enter Username
              </Display>

              <Display type="error" if={ this.state.showPasswordError }>
                Please Enter Password
              </Display>

              <Display type="success" if={ this.state.successLogin }>
                User credentials correct!
              </Display>

              <ActivityIndicatorIOS style={ styles.loader } animating={ this.state.showProgress } size='large'>
              </ActivityIndicatorIOS>
          </View>
        );
    }

    onLoginPressed() {

        if( this.state ) {
            if( this.state.username ) {

                if( this.state.password ) {

                    this.setState({
                        showProgress: true
                    });

                    var AuthService = require('./AuthService');

                    AuthService.login({
                        username: this.state.username,
                        password: this.state.password
                    },( res ) => {
                        this.setState({
                            showProgress: false
                        });

                        if( !res.error ) {
                            this.setState({ successLogin: true });
                            if( this.props.onLogin ) {
                                this.props.onLogin();
                            }
                        } else {
                            this.setState( res.data );
                        }
                    });

                } else {

                    this.setState({
                        showPasswordError: true
                    });

                }

            } else {
                this.setState({
                    showUsernameError: true
                })
            }
        }
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 22,
        alignSelf: 'center'
    },
    loader: {
        marginTop: 10
    }
});

module.exports = Login;