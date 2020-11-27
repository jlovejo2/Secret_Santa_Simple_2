import { useIndexQuery } from "../src/graphql/types";
import { gql } from "@apollo/client";
import Todo from "../components/todo";
import { useState, ChangeEvent, useEffect } from "react";

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
  
    const onClickAddTodo = () => {};
  
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
      </>
    );
  };

export default Index;