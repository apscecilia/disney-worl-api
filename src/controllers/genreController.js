const db = require('../models')
const { catchErrors } = require('../middleware/errors')


const Genre = db.Genre

const show = async (req, res) => {
  const genre = await Genre.findByPk(req.params.id)
  if (!genre) throw new NotFoundError()
  res.json(genre)
}

module.exports = {
  show: catchErrors(show),
}
