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
    <div className="col-[2_/_3] row-[2_/_3] bg-[#fffcf9 pt-[18px] px-[25px]
    pb-[28px] flex flex-col justify-between border-l border-l-[rgba(0, 0, 0, 0.08)]">
      <AddTodoForm onAddItem={addItem} />

      <div style={{
        marginTop: 'auto'
      }}>
        {isAuthenticated ? (
          <div style={{
            marginTop: 'auto'
          }}>
            <Button type="button" buttonType="primary" onClick={toggleLogIn} key={'log out'} text="Log out" />
          </div>
        ) : (
          // <ButtonGroup />
          <>
            <Button type="button" buttonType="primary" onClick={toggleLogIn} key={'log in'} text="Log in" />
            <Button type="button" buttonType="primary" className="my-2" onClick={() => { }} key={'log out'} text="Register" />
          </>
        )
        }

      </div>


    </div>
  );
}