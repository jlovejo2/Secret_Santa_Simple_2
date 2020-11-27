import { gql } from "@apollo/client";
import { useTodoQuery, useUpdateTodoMutation } from "../../src/graphql/types";
import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { groupMember } from '../../pages/index';
import { TableHeader, TableRow } from "../Table";

interface Props {
    groupDetails: groupMember[]
}

// gql`
  
// `;

const GroupSummary = (props: Props) => {
    const {groupDetails } = props

  return (
      <Fragment>
              <table className='table-auto'>
                  <TableHeader groupDetails={groupDetails} />
                  <tbody>
                    <TableRow groupDetails={groupDetails} />
                  </tbody>
              </table>
      </Fragment>

  );
};

export default GroupSummary;