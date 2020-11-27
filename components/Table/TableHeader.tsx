import React from 'react';
import { groupMember } from '../../pages';

type TableHeaderProps = {
    groupDetails: groupMember[]
}

const TableHeader = (props: TableHeaderProps) => {

    const { groupDetails } = props

    const groupKeysArray = Object.keys(groupDetails[0])

    return (
        <thead>
            <tr>
                {groupKeysArray.map((groupKey, index)=> {
                    console.log('group key table header: ', groupKey)
                    return <th key={index}>{groupKey}</th>
                })}
            </tr>
        </thead>
    )
}

export default TableHeader;