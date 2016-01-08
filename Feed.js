'use strict';
var React = require('react-native');

var {
    Text,
    View,
    Component,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    Image
    } = React;

var moment = require('moment');
var Push = require('./Push');

class Feed extends Component {
    constructor( props ) {
        super( props );

        var ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            errorFetchingData: false,
            loadingData: true
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    pressRow( rowData ) {
        this.props.navigator.push({
            title: 'Push Event',
            component: Push,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow( rowData ){

        return (
            <TouchableHighlight
                onPress={ () => this.pressRow( rowData ) }
                underlayColor='#ddd'>
                <View style={ styles.row }>
                    <Image
                        source={{uri: rowData.actor.avatar_url}}
                        style={ styles.rowImage }
                        />

                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{backgroundColor: '#fff'}}>
                            {moment(rowData.created_at).fromNow()}
                        </Text>
                        <Text>
                            { rowData.actor.login }
                        </Text>
                        <Text>
                            Event Type: { rowData.type }
                        </Text>
                        <Text style={{backgroundColor: '#fff'}}>
                            Name - <Text>{rowData.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    fetchFeed() {
        require('./AuthService')
            .getAuthInfo( ( authInfo ) => {

                if( authInfo.error ) {
                    this.setState({
                        errorFetchingData: true
                    });
                } else {
                    var url = 'https://api.github.com/users/'+ authInfo.data.user.login + '/received_events';

                    fetch( url, {
                        headers: authInfo.data.header
                    })
                    .then( ( response ) => response.json() )
                    .then( ( responseData ) => {
                        var feedItems = responseData;
                        this.setState({
                            loadingData: false,
                            dataSource: this.state.dataSource.cloneWithRows( feedItems )
                        });
                    })

                }
            })
    }

    render() {

        if( this.state.loadingData ) {
            return (
                <ActivityIndicatorIOS animating={true} size="large" style={ styles.container }>
                </ActivityIndicatorIOS>
            )
        }

        if( this.state.errorFetchingData ) {
            return (
                <Display if={true} type="fetchError">
                    Error Getting Data
                </Display>
            )
        }

        return (
            <View style={ styles.list }>
                <ListView
                    dataSource = { this.state.dataSource }
                    renderRow = { this.renderRow.bind( this ) }>
                </ListView>
            </View>
        )
    }
}

module.exports = Feed;

var styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 60,
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
    }
});