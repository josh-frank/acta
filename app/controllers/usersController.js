const bcrypt = require( "bcryptjs" );

const User = require( "../models" ).User;
const Edit = require( "../models" ).Edit;
const Article = require( "../models" ).Article;

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

exports.update = async ( request, response ) => {
    let previousUserValues;
    await User.findByPk( request.params.userId ).then( user => previousUserValues = user );
    await User.update( {
        username: request.body.username || previousUserValues.username,
        password: request.body.password ? bcrypt.hashSync( request.body.password, 8 ) : previousUserValues.password,
        profile: request.body.profile || previousUserValues.profile,
    }, { where: { id: request.params.userId } } );
    return User.findByPk( request.params.userId, userSerializationOptions )
        .then( updatedUser => response.status( 200 ).send( updatedUser ) )
        .catch( error => response.status( 400 ).send( error ) );
}
