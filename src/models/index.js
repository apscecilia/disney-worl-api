const Sequelize = require('sequelize')

const sequelize = new Sequelize('disneyapi', 'postgres', 'admin',
  
  {
    host: process.env.localhost,
    dialect: 'postgres' ,
    
  }
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./user')(sequelize)
db.Character = require('./character')(sequelize)
db.Movie = require('./movie')(sequelize)
db.Genre = require('./genre')(sequelize)

// Asociaciones
db.Movie.belongsToMany(db.Character, {
  through: 'CharacterMovies',
  as: 'characters',
  foreignKey: 'movieId',
})
db.Character.belongsToMany(db.Movie, {
  through: 'CharacterMovies',
  as: 'movies',
  foreignKey: 'characterId',
})

db.Movie.belongsToMany(db.Genre, {
  through: 'GenreMovies',
  as: 'genres',
  foreignKey: 'movieId',
})
db.Genre.belongsToMany(db.Movie, {
  through: 'GenreMovies',
  as: 'movies',
  foreignKey: 'genreId',
})

const fillGenresTable = () => {
  db.Genre.count().then((numberOfGenres) => {
    if (numberOfGenres === 0) {
      db.Genre.bulkCreate(db.Genre.data).then('List of genres created')
    }
  })
}

db.sync = () => {
  if (process.env.NODE_ENV === 'test') {
    db.sequelize.sync({ alter: true }).then(fillGenresTable)
  } else {
    db.sequelize.sync().then(fillGenresTable)
  }
}

sequelize.authenticate().then(() => {
  console.log('********* La conexíon se realizó correctamente**************');
}).catch(err => {
  console.error('****** No se pudo conectar a la Base de datos******', err);
});

module.exports = db
