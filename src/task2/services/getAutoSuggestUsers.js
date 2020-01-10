import routes from '../exampleDB';
import { sortByPropery } from './helpers/sortByProperty';

export function getAutoSuggestUsers(loginSubstring, limit) {
    const usersList = [];
    const propToSort = 'login';

    for (let i = 0; i < routes.length; i += 1) {
        if (routes[i].login.match(loginSubstring)) {
            usersList.push(routes[i]);
        }

        if (usersList.length === +limit) break;
    }

    if (usersList.length) {
        return sortByPropery(usersList, propToSort);
    }
    return null;
}
