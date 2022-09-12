const badRequest = (res) => res.status(400).send({ message: 'Invalid ID' });
const notFound = (res) => res.status(404).send({ message: 'Not found' });
const serverError = (res) => res.status(500).send({ message: 'Internal server error' });

module.exports({ badRequest, notFound, serverError });
