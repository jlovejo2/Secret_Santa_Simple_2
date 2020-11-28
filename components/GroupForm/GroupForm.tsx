import { gql } from "@apollo/client";
import { useTodoQuery, useUpdateTodoMutation } from "../../src/graphql/types";
import { useState, ChangeEvent, useEffect, Fragment, FormEvent, } from "react";
import { groupMember } from '../../pages/index';

interface Props {
    groupDetails: groupMember[],
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
}

// gql`
  
// `;

const GroupForm = (props: Props) => {
    const {groupDetails, onSubmit } = props
//   const { loading, data } = useTodoQuery({
//     variables: {
//       todoId,
//     },
//   });
//   const [localCompleted, setLocalCompleted] = useState(false);
//   const [updateTodo] = useUpdateTodoMutation();
//   let content = <td colSpan={2}>Loading ...</td>;

  return (
      <Fragment>
       <form className='m-2' onSubmit={onSubmit} >
            <div>
                <label className='block'>
                    <span className='text-gray-800'>First Name:</span> 
                    <input type='text' name='firstName' placeholder='First Name' className='form-input mt-1 block w-full border-solid border-2 border-black-300' />
                </label>
            </div>
            <div>
               <label className='block'>
                    <span className='text-gray-800'>Last Name:</span> 
                    <input type='text' name='lastName' placeholder='Last Name' className='form-input mt-1 block w-full border-solid border-2 border-black-300'/>
                </label>
            </div>
            <div>
               <label className='block'>
                    <span className='text-gray-800'>Email:</span> 
                    <input type='text' name='email' placeholder='Email' className='form-input mt-1 block w-full border-solid border-2 border-black-300'/>
                </label>
            </div>
            <div>
                <button type='submit' className="btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded" >
                    Submit
                </button>
            </div>
       </form>
       </Fragment>
  );
};

export default GroupForm;