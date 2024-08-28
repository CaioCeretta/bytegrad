import { useState } from "react";
import { useItemsStore } from "../stores/itemsStore";
import AddTodoForm from "./AddTodoForm";
import Button from "./Button";



export default function Sidebar() {
  const addItem = useItemsStore((state) => state.addItem);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const toggleLogIn = () => {
    setIsAuthenticated(prev => !prev)
  }


  return (
    <div className="sidebar">
      <AddTodoForm onAddItem={addItem} />

      <div style={{
        marginTop: 'auto'
      }}>
        {isAuthenticated ? (
          <div style={{
            marginTop: 'auto'
          }}>
            <Button buttonType="primary" onClick={toggleLogIn} key={'log out'} text="Log out" />
          </div>
        ) : (
          // <ButtonGroup />
          <>
            <Button buttonType="primary" onClick={toggleLogIn} key={'log in'} text="Log in" />
            <Button buttonType="primary" className="my-2" onClick={() => { }} key={'log out'} text="Register" />
          </>
        )
        }

      </div>


    </div>
  );
}