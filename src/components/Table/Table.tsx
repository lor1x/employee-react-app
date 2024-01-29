import { useState } from "react";
import { EmployeeDetails } from "../../EmployeeDetails";
import Employee from "../../api/employee/employeeInterface";
import useEmployeeStore from "../../state/store";
import { Modal } from "../Modal/Modal";
import { deleteEmployee } from "../../api/employee/employee";

type Props = {
  employees: Employee[] | [];
};

export function Table({ employees }: Props) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [currentEmployee, setCurrentEmployee] = useState<number>(0);
  const isOpen = useEmployeeStore((state) => state.isOpen);
  const toggleModal = useEmployeeStore((state) => state.setIsOpen);
  const removeEmployeeFromState = useEmployeeStore(
    (state) => state.deleteEmployee
  );

  function prepareEmployeeDetails(idx: number, mode: "view" | "edit") {
    setMode(mode);
    setCurrentEmployee(idx);
    toggleModal();
  }

  function removeEmployee(idx: number) {
    if (confirm("Are you sure you want to delete these records?")) {
      deleteEmployee(employees[idx].id);
      removeEmployeeFromState(employees[idx].id);
    }
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md sm:rounded-lg sm:h-5/6 md:h-[75vh] lg:w-1/2 flex">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="uppercae sticky top-0 text-xs text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 w-full">
            <tr>
              <th scope="col" className="text-center px-1.5 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3 w-2/4">
                Name
              </th>
              <th scope="col" className="px-6 py-3 w-1/3" />
            </tr>
          </thead>
          <tbody className="min-w-full">
            {employees?.map(({ id, name }: Employee, idx: number) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td scope="row" className="text-center py-3 font-medium">
                  {id}
                </td>
                <td className="p-3 font-bold">{name}</td>
                <td className="px-5 py-3 text-right flex flex-wrap space-y-2 md:space-y-0 md:flex-nowrap justify-around">
                  <button
                    onClick={() => prepareEmployeeDetails(idx, "view")}
                    className="font-medium text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-900"
                  >
                    View
                  </button>
                  <button
                    onClick={() => prepareEmployeeDetails(idx, "edit")}
                    className="font-medium text-yellow-600 dark:text-yellow-500 bg-gray-100 dark:bg-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeEmployee(idx)}
                    className="font-medium text-red-600 dark:text-red-500 bg-gray-100 dark:bg-gray-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <Modal>
          <EmployeeDetails employeeId={currentEmployee} mode={mode} />
        </Modal>
      )}
    </>
  );
}
