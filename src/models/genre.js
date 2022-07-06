const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize) => {
  class Genre extends Model {}

  Genre.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return process.env.SCHEME_AND_HOST + this.getDataValue('image')
        },
      },
    },
    {
      sequelize,
    }
  )

  Genre.data = [
    { name: 'Adventure', image: '/images/genres/sdventure.png' },
    { name: 'Comedy', image: '/images/genres/comedy.png' },
    { name: 'Fantasy', image: '/images/genres/fantasy.png' },
    { name: 'Drama', image: '/images/genres/drama.png' },
    { name: 'Musical', image: '/images/genres/musical.png' },
    { name: 'Action', image: '/images/genres/action.png' },
    { name: 'Romance', image: '/images/genres/romance.png' },
    { name: 'Sci-Fi', image: '/images/genres/sci-fi.png' },
   
  ]

  return Genre
}
