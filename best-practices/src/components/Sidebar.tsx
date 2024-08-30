import { ReactNode } from "react";



export default function Sidebar({children}: {children: ReactNode}) {

  return (
    <div className="col-[2_/_3] row-[2_/_3] bg-[#fffcf9] pt-[18px] px-[25px] pb-[28px] flex flex-col
    justify-between border-l border-l-[rgba(0, 0, 0, 0.08)]">
      {children}
    </div>
  );
}