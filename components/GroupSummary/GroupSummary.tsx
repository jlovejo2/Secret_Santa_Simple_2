import { gql } from "@apollo/client";
import { useTodoQuery, useUpdateTodoMutation } from "../../src/graphql/types";
import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { groupMember } from '../../pages/index';
import { TableHeader, TableRow } from "../Table";
import { chooseSecretSanta, randomizeArray } from "../../src/utils/custom-functions";

interface Props {
    groupDetails: groupMember[],
}

// gql`
  
// `;

const GroupSummary = (props: Props) => {
    const { groupDetails } = props

    const handleSave = () => {

    }

    const handleSecretSantaPicking = () => {
       const newSecretSanta = chooseSecretSanta(groupDetails)
    }

  return (
      <Fragment>
              <table className='table-auto w-full text-center'>
                  <TableHeader groupDetails={groupDetails} />
                  <tbody>
                    <TableRow groupDetails={groupDetails} />
                  </tbody>
              </table>
              <div>
              <button type='button' onClick={handleSave} className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'>
                  Save
              </button>
              <button type='button' onClick={handleSecretSantaPicking} className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'>
                  Start picking
              </button>
          </div>
      </Fragment>

  );
};

export default GroupSummary;