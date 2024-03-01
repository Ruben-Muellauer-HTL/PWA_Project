import colors from 'colors';

const errorHandler = (req, res, err, next) => {
  console.log(colors.red(`Error ==> ${err.message}`));
  res.status(500).send('An error occured!');
  next();
};

const notFoundHandler = (req, res) => {
  console.log(colors.blue(`Could not find ressource ==> ${req.originalURL}`));
  res.status(400).send('The ressource was not found on the server');
};

export { errorHandler, notFoundHandler };
