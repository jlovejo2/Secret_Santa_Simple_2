import React from 'react';
import { groupMember } from '../../pages';

type TableHeaderProps = {
    groupDetails: groupMember[]
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