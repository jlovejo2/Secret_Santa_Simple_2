import { gql } from "@apollo/client";
import { useTodoQuery, useUpdateTodoMutation } from "../../src/graphql/types";
import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { groupMember } from '../../pages/index';

interface Props {
    groupDetails: groupMember[]
}

// gql`
  
// `;

const GroupForm = (props: Props) => {
    const {groupDetails } = props
//   const { loading, data } = useTodoQuery({
//     variables: {
//       todoId,
//     },
//   });
//   const [localCompleted, setLocalCompleted] = useState(false);
//   const [updateTodo] = useUpdateTodoMutation();
//   let content = <td colSpan={2}>Loading ...</td>;

  return (
       <form>
            <div>
                <label>
                    First Name: 
                    <input type='text' name='firstName' />
                </label>
            </div>
            <div>
               <label>
                    Last Name: 
                    <input type='text' name='lastName' />
                </label>
            </div>
            <div>
               <label>
                    Email: 
                    <input type='text' name='email' />
                </label>
            </div>
            <div>
                <button type='submit' >
                    Submit
                </button>
            </div>
       </form>
  );
};

export default GroupForm;