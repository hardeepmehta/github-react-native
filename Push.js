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

var moment = require('moment');

class Push extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        var rowData = this.props.pushEvent;
        return (
            <View style={ styles.payload }>
                <Image
                    source={{ uri: rowData.actor.avatar_url }}
                    style={ styles.image }
                    />

                <Text style={ styles.firstLine }>
                    { moment( rowData.created_at ).fromNow() }
                </Text>

                <Text style={{ fontWeight: '800' }}> { rowData.actor.login } </Text>

                <Text> Type - { rowData.type } </Text>

                <Text> Repo - { rowData.repo.name } </Text>
            </View>
        )
    }

}

module.exports = Push;

var styles = StyleSheet.create({
    payload: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
        alignItems: 'center'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    firstLine: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20
    }
});