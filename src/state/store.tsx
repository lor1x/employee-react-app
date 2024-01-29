import { create } from "zustand";
import { persist } from "zustand/middleware";
import Employee from "../api/employee/employeeInterface";

interface EmployeeState {
  employees: Employee[] | [];
  isOpen: boolean;
  setIsOpen: () => void;
  setEmployees: (fetchedEmployees: Employee[] | []) => void;
  updateEmployee: (employeeId: string, employeeData: Employee) => void;
  deleteEmployee: (employeeId: string) => void;
}

const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: [],
      isOpen: false,
      setIsOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
      setEmployees: (fetchedEmployees) =>
        set((state) => ({ ...state, employees: fetchedEmployees })),
      updateEmployee: (id, employeeData) =>
        set((state) => ({
          ...state,
          employees: state.employees.map((employee) =>
            employee?.id === id ? employeeData : employee
          ),
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          ...state,
          employees: state.employees.filter((employee) => employee?.id !== id),
        })),
    }),
    { name: "employeeStore" }
  )
);

export default useEmployeeStore;
