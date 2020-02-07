import { UserGroup } from '../models/UserGroup';
// import { db } from '../config/database';

async function addUsersToGroup(obj) {
    // const t = await db.transaction();
    // console.log({
    //     groupId,
    //     userId
    // });

    // try {
    //     await UserGroup.create({
    //         groupId,
    //         userId
    //     }, { transaction: t });

    //     await t.commit();
    // } catch (error) {
    //     await t.rollback();
    // }
    console.error('obj: ', obj);
    await UserGroup.bulkCreate(obj);
}

export const DBRequest = {
    addUsersToGroup
};
