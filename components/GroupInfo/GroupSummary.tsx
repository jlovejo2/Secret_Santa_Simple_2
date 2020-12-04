import { gql } from "@apollo/client";
import { GroupMember } from "../../src/graphql/types";
import { useState, ChangeEvent, useEffect, Fragment, SetStateAction, Dispatch } from "react";
import { TableHeader, TableRow } from "../Table";
import { emailSender } from '../../src/dao/nodeMailer';
import { CreateGroupInput } from "../../src/dao";

interface Props {
    groupDetails: GroupMember[] | CreateGroupInput[],
}



const GroupSummary = (props: Props) => {
    const { groupDetails } = props

  return ( 
    <Fragment>
      { groupDetails ? (
          <>
            <table className='table-auto w-full text-center'>
                  <TableHeader groupDetails={groupDetails} />
                  <tbody>
                    <TableRow groupDetails={groupDetails} />
                  </tbody>
            </table>
            {/* <div>
            {groupWithPicks ? (
                <table className='table-auto w-full text-center'>
                    <TableHeader groupDetails={groupWithPicks} />
                    <tbody>
                        <TableRow groupDetails={groupWithPicks} />
                    </tbody>
                </table>
            ) : (
            <div>No picks yet.</div>
            ) }
            </div> */}
          </>
      ) : (<div>Nothing to show.</div>)
      }
      </Fragment>
  );
};

export default GroupSummary;