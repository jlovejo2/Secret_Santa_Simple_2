import { useIndexQuery } from "../src/graphql/types";
import { gql } from "@apollo/client";
import { Todo, GroupForm, GroupSummary } from "../components";
import { useState, ChangeEvent, useEffect } from "react";

export type groupMember = {
    firstName: String,
    lastName: String,
    email: String
}

gql`
  query Index {
    allTodos {
      todoId
    }
  }
`;

const Index = () => {
    const { data, loading } = useIndexQuery();
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [groupDetails, setGroupDetails ] = useState<groupMember[]>([{firstName:'Eddie', lastName:"Lovejoy",email:'james.lovejoy2@gmail.com'}]);
    const [currentGroupMember, setCurrentGroupMember] = useState("")

    const [todoIds, setTodoIds] = useState<string[]>();
  
    const fillTodoIds = (data: string[]) => {
      setTodoIds(data?.slice().sort((a, b) => a.localeCompare(b)));
    };
  
    useEffect(() => {
      fillTodoIds(data?.allTodos?.map((t) => t.todoId));
    }, [data?.allTodos]);
  
    const updateTodoDescription = (e: ChangeEvent) => {
      setNewTodoDescription((e.target as HTMLInputElement).value.toString());
    };

    const changeCurrentGroupMember = (e: ChangeEvent) => {
        console.log('event: ', (e.target as HTMLInputElement).value.toString())
        setCurrentGroupMember((e.target as HTMLInputElement).value.toString())
    }
  
    const onClickAddTodo = () => {};
  
    const onClickAddGroupInput = () => {

    }

    const todoElements = todoIds?.map((id) => <Todo todoId={id} key={id} />);
  
    const body =
      loading ||
      typeof todoElements === "undefined" ? null : todoElements.length > 0 ? (
        <>
          <table>
            <tbody>{todoElements}</tbody>
          </table>
        </>
      ) : (
        <div>No ToDos!</div>
      );
  
    return (
      <>
      <div className='flex grid grid-cols-3 gap-2 justify-center'>
      <div className='col-start-2 col-span-2'>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodoDescription}
          onChange={updateTodoDescription}
        ></input>
        <button type="button" onClick={onClickAddTodo}>
          Add
        </button>
            {body}
        </div>
        <div className='col-start-2 col-span-1 justify-center'>
            <GroupForm groupDetails={groupDetails} />
        </div>
        <div className='col-start-2 col-span-1'>
            <GroupSummary groupDetails={groupDetails} />
        </div>
        </div>
      </>
    );
  };

export default Index;