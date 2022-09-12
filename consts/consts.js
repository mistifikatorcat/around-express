const badId = (res) => res.status(400).send({ message: 'Invalid ID' });
const badURL = (res) => res.status(400).send({ message: 'Invalid URL' });
const notFound = (res) => res.status(404).send({ message: 'Not found' });
const serverError = (res) => res.status(500).send({ message: 'Internal server error' });

module.exports = ({ badId, notFound, serverError, badURL });
