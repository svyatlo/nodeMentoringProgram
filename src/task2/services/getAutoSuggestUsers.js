import { persons } from '../exampleDB';
import { sortByPropery } from './helpers/sortByProperty';

export function getAutoSuggestUsers(loginSubstring, limit) {
    const usersList = [];
    const propToSort = 'login';

    for (let i = 0; i < persons.length; i += 1) {
        if (persons[i].login.match(loginSubstring)) {
            usersList.push(persons[i]);
        }

        if (usersList.length === +limit) break;
    }

    if (usersList.length) {
        return sortByPropery(usersList, propToSort);
    }
    return null;
}
