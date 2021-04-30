import { AbilityBuilder, Ability } from "@casl/ability";
import ability from "./ability"
export function defineAbilitiesFor(user) {
    const { rules, can } = new AbilityBuilder()
    //console.log(user)
    let actionUser = []
    let subjectUser = []
    let action = [];
    let subject = [];
    user.permissionUser.split(',').map(item => {
        let obj = item.split('.');
        //actionUser.push(obj[1])
        //subjectUser.push(obj[0])
        can(obj[1], obj[0])
    })
    //action = [
    //    ...new Set(actionUser)
    //];
    //subject = [
    //    ...new Set(subjectUser)
    //];
    //can('read', ['Post', 'Comment'])
    //can(action, subject)
    ability.update(rules);
    //console.log(new Ability(rules))
    //return new Ability(rules)
}
export function _isPermission(action, subject) {
    //console.log(ability)
    //console.log(ability.can('duyet', 'User'))
    return ability.can(action, subject)

}