const Article = require( "../models" ).Article;
const Edit = require( "../models" ).Edit;

const getArticleSerializationOptions = {
    attributes: { exclude: [ "updatedAt" ] },
    include: [
        {
            model: Edit,
            attributes: { exclude: [ "articleId", "updatedAt" ] },
            as: "edits"
        }
    ],
    order: [
        [ { model: Edit, as: "edits" }, "createdAt", "DESC" ],
        [ { model: Edit, as: "edits" }, "current", "DESC" ]
    ]
};

const createArticleSerializationOptions = {
    include: [ "edits" ]
};

module.exports = {
    index( request, response ) {
        return Article.findAll( getArticleSerializationOptions )
            .then( allArticles => response.status( 201 ).send( allArticles ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    show( request, response ) {
        return Article.findByPk( request.params.id, getArticleSerializationOptions )
            .then( article => response.status( 201 ).send( article ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    create( request, response ) {
        return Article.create( {
            title: request.body.title,
            edits: [ { content: request.body.content, current: true } ]
        }, createArticleSerializationOptions )
            .then( newArticle => response.status( 201 ).send( newArticle ) )
            .catch( error => response.status( 400 ).send( error ) );
    }
};
