const Joi = require('@hapi/joi');

const idSchema = Joi.object({
    id: Joi.string().pattern(new RegExp('[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}')).required()
});

const objectSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

const arraySchema = Joi.array().items(idSchema.concat(objectSchema));

export const schema = {
    idSchema,
    objectSchema,
    arraySchema
}