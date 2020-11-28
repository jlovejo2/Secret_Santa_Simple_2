import { useIndexQuery } from "../src/graphql/types";
import { gql } from "@apollo/client";
import { Todo, GroupForm, GroupSummary } from "../components";
import { useState, ChangeEvent, SyntheticEvent, useEffect, FormEvent } from "react";

export type groupMember = {
    first_name: String,
    last_name: String,
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
    const [groupDetails, setGroupDetails ] = useState<groupMember[]>([{first_name:'Eddie', last_name:"Lovejoy", email:'james.lovejoy2@gmail.com'}]);
    const [currentGroupMember, setCurrentGroupMember] = useState<groupMember>()

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

    }
  
    const onClickAddTodo = () => {};
  
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
                console.log('current group member: ', currentGroupMember)
                break;
        }

        console.log('current group memeber: ', currentGroupMember)
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
      <div className='flex grid grid-cols-6 gap-2 justify-center'>
      <div className='col-start-3 col-span-2'>
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
        <div className='col-start-3 col-span-2 justify-center'>
            <GroupForm groupDetails={groupDetails} handleChangeGroupForm={handleChangeGroupForm} onSubmit={handleNewGroupMember}/>
        </div>
        <div className='col-start-2 col-span-4'>
            <GroupSummary groupDetails={groupDetails} />
        </div>
        </div>
      </>
    );
  };

export default Index;