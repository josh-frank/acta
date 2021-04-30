const Article = require( "../models" ).Article;
const User = require( "../models" ).User;
const Edit = require( "../models" ).Edit;

const userSerializationOptions = {
    attributes: { exclude: [ "password" ] },
    include: [
        {
            model: Edit,
            attributes: { exclude: [ "articleId", "userId", "updatedAt" ] },
            as: "edits",
            include: {
                model: Article,
                attributes: { exclude: [ "updatedAt" ] },
                as: "article"
            }
        }
    ],
    order: [
        [ { model: Edit, as: "edits" }, "createdAt", "DESC" ]
    ]
};

exports.show = ( request, response ) => {
    return User.findByPk( request.params.userId, userSerializationOptions )
        .then( user => response.status( 200 ).send( user ) )
        .catch( error => response.status( 400 ).send( error ) );
}
