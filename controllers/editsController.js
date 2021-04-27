const Edit = require( "../models" ).Edit;

module.exports = {
    create( request, response ) {
        return Edit.create( { content: request.body.content, current: true, articleId: request.body.articleId } )
            .then( edit => response.status( 201 ).send( edit ) )
            .catch( error => response.status( 400 ).send( error ) );
    }
};
