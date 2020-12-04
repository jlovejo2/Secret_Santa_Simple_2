import { gql } from "@apollo/client";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Group, GroupDbObject } from "../../src/dao";
import { CreateGroupMutation, GroupMember, useCreateGroupMutation } from "../../src/graphql/types";
import { chooseSecretSanta } from "../../src/utils/custom-functions";
import GroupForm from "./GroupForm";
import GroupSummary from "./GroupSummary";


const psuedoGroup = [
    {
        first_name: 'Eddie',
        last_name: 'Lovejoy',
        email: 'james.lovejoy2@gmail.com'
    },
    {
        first_name: 'Kelly',
        last_name: 'Phelan',
        email: 'kelyphelan8@gmail.com'
    },
    {
        first_name: 'Jane',
        last_name: 'Watt',
        email: 'jane@gmail.com'
    },
    {
        first_name: 'Darius',
        last_name: 'Watt',
        email: 'darius@gmail.com'
    },    
    {
        first_name: 'Brian',
        last_name: 'Phelan',
        email: 'bphelan@gmail.com'
    },
    {
        first_name: 'Gina',
        last_name: 'Phelan',
        email: 'gphelan@gmail.com'
    },
    {
        first_name: 'Sharon',
        last_name: 'Phelan',
        email: 'phelan.sharon.l@gmail.com'
    },
    {
        first_name: 'Tom',
        last_name: 'Phelan',
        email: 'phelan.thomas.j@gmail.com'
    }
]

gql`
mutation createGroup($input: [CreateGroupInput!]!){
	createGroup(input: $input){
    groupId
    members {
      first_name
      last_name
      email
    }
  }	
}
`;

const GroupCombined = () => {
    const [groupDetails, setGroupDetails ] = useState<GroupMember[]>(psuedoGroup);
    const [currentGroupMember, setCurrentGroupMember] = useState<GroupMember>()
    const [savedGroup, setSavedGroup] = useState<Group>()

    const [createGroup] = useCreateGroupMutation()

    const handleNewGroupMember = (e: FormEvent ) => {
        e.preventDefault();

        setGroupDetails([...groupDetails, currentGroupMember])
    }

    const handleChangeGroupForm = (e: ChangeEvent) => {

        const fieldName = (e.currentTarget as HTMLInputElement).name
        const fieldValue = (e.currentTarget as HTMLInputElement).value

        switch (fieldName) {
            case 'firstName':
                setCurrentGroupMember({...currentGroupMember, first_name: fieldValue })
                break;
            case 'lastName':
                setCurrentGroupMember({...currentGroupMember, last_name: fieldValue })
                break;
            case 'email':
                setCurrentGroupMember({...currentGroupMember, email: fieldValue })
                break;
            default:
                break;
        }
    }

    const handleSave = async () => {

        const { data } = await createGroup({
            variables: {
                input: groupDetails
            }
        })

        console.log('Data from save: ', data)
        console.log('Group from save: ', data.createGroup)

        const groupObj = {
            groupId: data.createGroup.groupId,
            members: data.createGroup.members
        }
        setSavedGroup(groupObj)
    }

    const handleSecretSantaPicking = () => {
        const newSecretSanta: GroupMember[] = chooseSecretSanta(savedGroup.members)
         console.log('picks: ', newSecretSanta)

        setGroupDetails(newSecretSanta)
        setSavedGroup({...savedGroup, members: newSecretSanta})

        console.log('updated saved group, i think: ', savedGroup)
     }

    const handleSendPicks = () => {

    }

    return (
        <Fragment>
        <div className='col-start-3 col-span-2 justify-center'>
            <GroupForm groupDetails={groupDetails} handleChangeGroupForm={handleChangeGroupForm} onSubmit={handleNewGroupMember}/>
        </div>
        <div className='col-start-2 col-span-4'>
            <GroupSummary groupDetails={groupDetails}/>
        </div>
        <div className='col-start-2 col-span-4'>
        <button type='button' onClick={handleSave} className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'>
            Save Group
        </button>
        <button type='button' onClick={handleSecretSantaPicking} className={`btn-primary ${savedGroup ? '' : 'disabled:opacity-50 disabled:bg-green-700'} mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded`} disabled={savedGroup ? false : true}>
            Start picking
        </button>
        <button type='button' onClick={handleSendPicks} className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'>
            Send Picks
        </button>
        </div>
        </Fragment>
    )
}

export default GroupCombined;