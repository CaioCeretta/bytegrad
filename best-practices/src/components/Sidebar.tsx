import { useItemsStore } from "../stores/itemsStore";
import AddTodoForm from "./AddTodoForm";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";



export default function Sidebar() {
  const addItem = useItemsStore((state) => state.addItem);

  const isAuthenticated = true


  return (
    <div className="sidebar">
      <AddTodoForm onAddItem={addItem} />

      { isAuthenticated ? (
        <div style={{
          marginTop: 'auto'
        }}>
          <Button buttonType="primary" onClick={() => {}} key={'log out'} text="Log out" />
        </div>
      ) : (
        <ButtonGroup />
      )
    }

      
    </div>
  );
}