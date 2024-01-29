import { useEffect } from "react";
import { Table } from "./components/Table/Table";
import { getEmployees } from "./api/employee/employee";
import useEmployeeStore from "./state/store";

function App() {
  const employees = useEmployeeStore((state) => state.employees);
  const setEmployees = useEmployeeStore((state) => state.setEmployees);

  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-full">
      <h1 className="mb-10 font-bold text-4xl">On-Demand Pay</h1>
      <Table employees={employees} />
    </div>
  );
}

export default App;
