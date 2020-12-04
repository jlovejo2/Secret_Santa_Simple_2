import React, { Fragment } from 'react';
import { GroupMember } from '../../src/graphql/types';


type TableRowProps = {
    groupDetails: GroupMember[]
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
                                <td key={keyIndex}>
                                    { typeof groupMemberInfo[groupKey]  === 'string' && groupKey != 'secret_pick' ?
                                    groupMemberInfo[groupKey] : ( groupKey === 'secret_pick' ? 'pick successful' : 'No pick' )
                                    }
                                </td>
                                )
                            })}
                        </tr>
                       )
                    })}
        </Fragment>
    )
}

export default TableRow;