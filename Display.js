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
    Component
    } = React;

class Display extends Component {

    constructor( props ) {
        super( props );
    }

    render() {

        var checkIf = this.props.if;
        if( checkIf ) {
            return (
                <Text style={ styles[ this.props.type ] }> { this.props.children } </Text>
            )
        } else {
            return (
               <View>
               </View>
            )
        }
    }

}

module.exports = Display;

var styles = StyleSheet.create({
    error: {
        color: '#ff0000',
        marginTop: 10,
        fontSize: 15
    },
    success: {
        color: '#5ca941',
        marginTop: 10,
        fontSize: 15
    },
    fetchError: {
        color: '#ff0000',
        marginTop: 50,
        fontSize: 15,
        alignSelf: 'center'
    }
});