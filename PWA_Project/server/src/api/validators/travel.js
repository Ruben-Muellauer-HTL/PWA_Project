import Joi from 'joi';

const customer = {
  firstname: Joi.string().min(3).alphanum().required(),
  lastname: Joi.string().min(3).required(),
  username: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'at', 'de'] } }),
  plz: Joi.number().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
};

const change = {
  newUser: Joi.string().min(5).required(),
  oldUser: Joi.string().min(5).required(),
};

const schemaCustomer = Joi.object(customer);
const schemaChange = Joi.object(change);

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};

const ValidateCustomer = (obj) => schemaCustomer.validate(obj, options).error;
const ValidateChange = (obj) => schemaChange.validate(obj, options).error;

export { ValidateCustomer, ValidateChange };
