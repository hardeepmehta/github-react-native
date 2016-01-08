var encoding = require('NativeModules').Encoding;
var { AsyncStorage } = require('react-native');
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo( cb ) {
        AsyncStorage.multiGet([
            authKey,
            userKey
        ], ( err, val ) => {
            if( err ) {
                return cb( {
                    error: true,
                    data: err
                });
            }

            if( !val ) {
                return cb({
                    error: true,
                    data: []
                });
            }

           var zippedObj = _.zipObject( val );

           if( !zippedObj[ authKey ] ) {
               return cb({
                   error: true,
                   data: []
               });
           }

           var authInfo = {
               header: {
                   Authorization: 'Basic '+zippedObj[ authKey ]
               },
               user: JSON.parse( zippedObj[ userKey ] )
           };

            return cb({
                error: false,
                data: authInfo
            });

        });
    }

    login( creds, callback ) {

        var authStr = creds.username + ':' + creds.password;

        encoding.base64Encode( authStr, ( encodeAuth )=>{
                fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': 'Basic '+ encodeAuth
                    }
                })
                .then( ( res ) => {
                    if( res.status >= 200 && res.status < 300 ) {
                        return res;
                    }

                    throw {
                        showCredentialsError: true
                    }
                })
                .then( ( res ) => {
                    return res.json()
                })
                .then( ( res ) => {

                    AsyncStorage.multiSet([
                        [  authKey,encodeAuth],
                        [  userKey, JSON.stringify( res ) ]
                    ], ( err )=> {
                        if( err ) {
                            throw err;
                        }
                        callback({
                            error: false,
                            data: res
                        });
                    });
                })
                .catch( ( err ) => {
                    callback({
                        error: true,
                        data: err
                    });
                })
        });
    }
}

module.exports = new AuthService();