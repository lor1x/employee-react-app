import React from "react";
import useEmployeeStore from "../../state/store";

interface ModalType {
  children?: React.ReactNode;
}

export function Modal({ children }: ModalType) {
  const setIsOpen = useEmployeeStore((state) => state.setIsOpen);

  return (
    <div
      className="top-0 w-screen h-full overflow-y-hidden fixed inset-0 backdrop-brightness-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={setIsOpen}
    >
      <div
        className="p-4 border-0 rounded-xl first-line:shadow-md overflow-y-scroll flex flex-col justify-center items-center h-full md:h-fit w-full sm:w-2/3 lg:w-1/3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 outline-none focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/*

<div className="flex items-center justify-end p-4 rounded-b">
          <button
            className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={setIsOpen}
          >
            Close
          </button>
        </div>
*/
