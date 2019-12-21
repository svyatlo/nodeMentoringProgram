import { get } from './get';
import { getById } from './getById';
import { updateById } from './updateById';
import { post } from './post';
import { deleteById } from './deleteById';
import { findByLogin } from './findByLogin';

export const routsHandlers = {
    get,
    getById,
    updateById,
    post,
    deleteById,
    findByLogin
};
