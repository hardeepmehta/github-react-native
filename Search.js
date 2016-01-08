'use strict';
var React = require('react-native');

var {
    Text,
    View,
    Component,
    StyleSheet,
    ActivityIndicatorIOS,
    TouchableHighlight,
    Image,
    TextInput
    } = React;

var moment = require('moment');
var Display = require('./Display');
var PushSearch = require('./PushSearch');

class Search extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            errorFetchingData: false,
            search: '',
            searchEmpty: false
        };
    }

    pressSearch() {
        if( this.state.search == '' ) {
             this.setState({
                 searchEmpty: true
             })
        } else {
            this.fetchSearchFeed();
        }
    }

    fetchSearchFeed() {
        this.props.navigator.push({
            title: 'Search Results',
            component: PushSearch,
            passProps: {
                url: 'https://api.github.com/search/repositories?q='+ this.state.search
            }
        });
    }

    render() {

        if( this.state.errorFetchingData ) {
            return (
                <View style={ styles.list }>
                    <Display if={true} type="fetchError">
                        Error Getting Data
                    </Display>
                </View>
            )
        }

        return (
            <View style={ styles.list }>
                <TextInput onChangeText={ ( text ) => this.setState({ search: text, searchEmpty: false }) } style={ styles.input } placeholder="Search Repositories"></TextInput>
                <TouchableHighlight onPress={ this.pressSearch.bind( this ) } style={ styles.button }>
                    <Text style={ styles.buttonText }>
                        Search
                    </Text>
                </TouchableHighlight>

                <Display if={ this.state.searchEmpty } type="fetchError">
                    Search Cannot be empty
                </Display>

            </View>
        )
    }
}

module.exports = Search;

var styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingBottom: 60
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    rowImage: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
    fetch: {
        padding: 50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});