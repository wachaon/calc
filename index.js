try{
    var log = require( 'log' )
    const calc = require( 'wachaon@calc' )
    log( () => calc)
    log( () => add( 6, 13 ) )
} catch ( e ) {
    log( () => require( 'filesystem' ).writeTextFileSync( 'log.json', JSON.stringify( wes, null, 2 ) ) )
    //throw e
    //
}
