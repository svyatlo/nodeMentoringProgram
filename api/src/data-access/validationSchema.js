const Joi = require('@hapi/joi');

const idSchema = Joi.object({
    id: Joi.string().pattern(new RegExp('[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}')).required()
});

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required()
});

// const arraySchema = Joi.array().items(idSchema.concat(userSchema));

export const schema = {
    idSchema,
    userSchema,
    groupSchema
};
