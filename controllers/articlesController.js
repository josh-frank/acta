const Article = require( "../models" ).Article;
const User = require( "../models" ).User;
const Edit = require( "../models" ).Edit;

const articleSerializationOptions = {
    attributes: { exclude: [ "updatedAt" ] },
    include: [
        {
            model: Edit,
            attributes: { exclude: [ "articleId", "userId", "updatedAt" ] },
            as: "edits",
            include: {
                model: User,
                attributes: { exclude: [ "password", "createdAt", "updatedAt" ] },
                as: "user"
            }
        }
    ],
    order: [
        [ { model: Edit, as: "edits" }, "createdAt", "DESC" ],
        [ { model: Edit, as: "edits" }, "current", "DESC" ]
    ]
};

exports.index = ( request, response ) => {
    return Article.findAll( articleSerializationOptions )
        .then( allArticles => response.status( 200 ).send( allArticles ) )
        .catch( error => response.status( 400 ).send( error ) );
}

exports.show = ( request, response ) => {
    return Article.findByPk( request.params.articleId, articleSerializationOptions )
        .then( article => response.status( 200 ).send( article ) )
        .catch( error => response.status( 400 ).send( error ) );
}

exports.create = ( request, response ) => {
    return Article.create( {
        title: request.body.title,
        edits: [ { content: request.body.content, current: true } ]
    }, { include: [ "edits" ] } )
        .then( newArticle => response.status( 201 ).send( newArticle ) )
        .catch( error => response.status( 400 ).send( error ) );
}

exports.addEdit = async ( request, response ) => {
    await Edit.update( { current: false }, { where: { articleId: request.params.articleId, current: true } } );
    await Edit.create( { content: request.body.content, current: true, articleId: request.params.articleId } );
    return Article.findByPk( request.params.articleId, articleSerializationOptions )
        .then( article => response.status( 201 ).send( article ) )
        .catch( error => response.status( 400 ).send( error ) );
}
