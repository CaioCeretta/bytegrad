
import Form from "../Form";

type Todo = {
  id: string;
  content: string;
}

type TodosComponentProps = {
  todos: Todo[]
}

export default function TodosComponent({todos}: TodosComponentProps) {


  return (
    <>

      <Form />

      <ul className="list-disc">
          {todos.map(todo => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
    </>
  )
}


