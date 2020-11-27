import { Resolvers, TodoMvc } from "./types";

const store: TodoMvc[] = [
  {
    todoId: "1",
    completed: false,
    description: "foo",
  },
  {
    todoId: "2",
    completed: false,
    description: "bar",
  },
];

const resolvers: Resolvers = {
  Query: {
    allTodos: () => store,
    Todo: (_: any, { todoId }) =>
      store.find((d) => d.todoId === todoId),
  },
};

export default resolvers;