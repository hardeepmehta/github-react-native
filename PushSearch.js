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
    ActivityIndicatorIOS,
    ListView
    } = React;

class PushSearch extends Component {

    constructor( props ) {
        super( props );

        var ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            loading: true
        };
    }

    componentDidMount() {
        fetch( this.props.url )
            .then( ( response ) => response.json() )
            .then( ( responseData ) => {
                this.setState({
                    loading: false,
                    dataSource: this.state.dataSource.cloneWithRows( responseData.items )
                });

            })
    }

    renderRow( rowData ){


        return (
            <View style={{ padding: 20, borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                <View>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>
                        { rowData.full_name }
                    </Text>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        marginBottom: 20
                    }}>
                       <View style={ styles.repoCell }>
                            <Image source={ require('image!star') } style={ styles.repoCellIcon }></Image>
                            <Text style={ styles.repoCellLabel }>
                                { rowData.stargazers_count }
                            </Text>
                       </View>

                        <View style={ styles.repoCell }>
                            <Image source={ require('image!fork') } style={ styles.repoCellIcon }></Image>
                            <Text style={ styles.repoCellLabel }>
                                { rowData.forks_count }
                            </Text>
                        </View>

                        <View style={ styles.repoCell }>
                            <Image source={ require('image!issues2') } style={ styles.repoCellIcon }></Image>
                            <Text style={ styles.repoCellLabel }>
                                { rowData.open_issues_count }
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    render() {

        if( this.state.loading ) {
            return (
                <ActivityIndicatorIOS animating={true} size="large" style={ styles.container }>
                </ActivityIndicatorIOS>            )
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

module.exports = PushSearch;

var styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingBottom: 60
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
    repo: {
        flex: 1,
        alignItems: 'center'
    },
    repoCell: {
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    },
    repoCellLabel: {
        textAlign: 'center'
    }
});