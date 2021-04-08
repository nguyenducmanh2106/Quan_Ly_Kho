﻿import { Ability } from "@casl/ability";
/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item) {
    if (!item || typeof item === "string") {
        return item;
    }

    return item.__type;
}

const ability = new Ability([], { subjectName });

export default ability;