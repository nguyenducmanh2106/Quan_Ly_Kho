import { AbilityBuilder, Ability } from "@casl/ability";
import ability from "./ability"
export function defineAbilitiesFor(user) {
    const { rules, can } = new AbilityBuilder()
    console.log(user)
    if (user.isRoot) {
        let actionUser = []
        let subjectUser = []
        let action = [];
        let subject = [];
        user.lstPermission.map(item => {
            let obj = item.code.split('.');
            actionUser.push(obj[1])
            subjectUser.push(obj[0])
        })
        action = [
            ...new Set(actionUser)
        ];
        subject = [
            ...new Set(subjectUser)
        ];
        //can(action, subject)
        can(action, subject, { author: user.id })
        //can(['read', 'update'], 'User', { _id: user.id })
    } else {
        let actionUser = []
        let subjectUser = []
        let action = [];
        let subject = [];
        user.permissionUser.split(',').map(item => {
            let obj = item.split('.');
            actionUser.push(obj[1])
            subjectUser.push(obj[0])
        })
        action = [
            ...new Set(actionUser)
        ];
        subject = [
            ...new Set(subjectUser)
        ];
        //can('read', ['Post', 'Comment'])
        can(action, subject)
    }
    ability.update(rules);
    //console.log(new Ability(rules))
    //return new Ability(rules)
}