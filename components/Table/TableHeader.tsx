import React from 'react';
import { CreateGroupInput } from '../../src/dao';
import { GroupMember } from '../../src/graphql/types';


type TableHeaderProps = {
    groupDetails: GroupMember[] | CreateGroupInput[]
}

const convertToDisplay = (inputString: string) => {
    const splitArray = inputString.split("_")
    let displayString = '';

    for (let i of splitArray) {
        displayString = displayString + ' ' + i
    }

    return displayString
}

const TableHeader = (props: TableHeaderProps) => {

    const { groupDetails } = props

    const groupKeysArray = Object.keys(groupDetails[0])

    return (
        <thead>
            <tr>
                {groupKeysArray.map((groupKey, index)=> {
                    return <th key={index} className=''>{convertToDisplay(groupKey)}</th>
                })}
            </tr>
        </thead>
    )
}

export default TableHeader;