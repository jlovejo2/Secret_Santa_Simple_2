import React, { Fragment } from 'react';
import { groupMember } from '../../pages';

type TableRowProps = {
    groupDetails: groupMember[]
}

const TableRow = (props: TableRowProps) => {

    const { groupDetails } = props

    const groupKeysArray = Object.keys(groupDetails[0])

    return (
        <Fragment>
                    {groupDetails.map((groupMemberInfo, index)=> {
                       return ( 
                       <tr className='bg-blue-200' key={index}>
                            {groupKeysArray.map((groupKey, keyIndex)=> {
                                return (
                                <td key={keyIndex}>{groupMemberInfo[groupKey]} </td>
                                )
                            })}
                        </tr>
                       )
                    })}
        </Fragment>
    )
}

export default TableRow;