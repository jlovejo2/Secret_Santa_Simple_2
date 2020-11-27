import { useIndexQuery } from "../src/graphql/types";
import { gql } from "@apollo/client";
import Todo from "../components/todo";
import { useState, ChangeEvent } from "react";

gql`
  query Index {
    allTodos {
      todoId
    }
  }
`;

const Index = () => {
  const { data, loading } = useIndexQuery();

  const allTodos = data?.allTodos
    ?.slice()
    .sort((a, b) => a.todoId.localeCompare(b.todoId));

  const todoElements = allTodos?.map((t) => (
    <Todo todoId={t.todoId} key={t.todoId} />
  ));

  return loading ? null : todoElements.length > 0 ? (
    <table>
      <tbody>{todoElements}</tbody>
    </table>
  ) : (
    <div>No ToDos!</div>
  );
};

export default Index;