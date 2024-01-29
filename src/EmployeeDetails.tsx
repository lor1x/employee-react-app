import React from "react";
import Employee from "./api/employee/employeeInterface";
import useEmployeeStore from "./state/store";

type EmployeeDetailsProps = {
  mode?: "view" | "edit";
  employeeId: number;
};

const calculateWeeklyAvailableAdvance = (
  hourlyWage: number,
  paidHours: number,
  maxHoursPerWeek: number
): number => {
  return hourlyWage * (paidHours / maxHoursPerWeek) * 0.3;
};

const calculateMonthlyAvailableAdvance = (
  hourlyWage: number,
  paidHours: number,
  maxHoursPerWeek: number
): number => {
  return (
    (calculateWeeklyAvailableAdvance(hourlyWage, paidHours, maxHoursPerWeek) *
      52) /
    12
  );
};

export function EmployeeDetails({ employeeId, mode }: EmployeeDetailsProps) {
  const employee = useEmployeeStore(
    (state) => state.employees[employeeId ?? 0]
  );
  const toggleModal = useEmployeeStore((state) => state.setIsOpen);

  const { name, hourlyWage, maxHoursPerWeek, paidHours }: Employee = employee;

  const saveData = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    const updatedEmployee: Employee = {
      ...employee,
      name: e?.target[0]?.value,
      hourlyWage: e?.target[1].value,
      maxHoursPerWeek: e?.target[2].value,
      paidHours: e?.target[3].value,
    };

    console.log(updatedEmployee);
    alert("Changes saved succesfully!");
    toggleModal();
  };

  return (
    <>
      <label
        className="block dark:text-white text-2xl text-center font-bold w-full mb-6"
        htmlFor="employee-details"
      >
        Employee Details
      </label>
      <form
        className="w-10/12 justify-center items-center"
        name="employee-details"
        onSubmit={(e) => saveData(e)}
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="fullName"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly={mode === "view"}
              className={`border-gray-200 appearance-none rounded w-full py-2 px-4 dark:bg-gray-800 bg-gray-200 font-bold dark:text-white text-black leading-tight ${
                mode === "view"
                  ? " dark:bg-gray-600"
                  : " border-gray-500 border-2 dark:bg-gray-900 focus:border-blue-800 hover:border-blue-500"
              }`}
              name="fullName"
              type="text"
              required
              defaultValue={name}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="hourlyWage"
            >
              Hourly Wage (£)
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly={mode === "view"}
              className={`border-gray-200 appearance-none rounded w-full py-2 px-4 dark:bg-gray-800 bg-gray-200 font-bold dark:text-white text-black leading-tight ${
                mode === "view"
                  ? " dark:bg-gray-600"
                  : " border-gray-500 border-2 dark:bg-gray-900 focus:border-blue-800 hover:border-blue-500"
              }`}
              name="hourlyWage"
              type="number"
              required
              defaultValue={hourlyWage}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="maxHoursPerWeek"
            >
              Hourls/Week
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly={mode === "view"}
              className={`border-gray-200 appearance-none rounded w-full py-2 px-4 dark:text-white text-black dark:bg-gray-800 bg-gray-200 font-bold leading-tight ${
                mode === "view"
                  ? " dark:bg-gray-600"
                  : " border-gray-500 border-2 dark:bg-gray-900 focus:border-blue-800 hover:border-blue-500"
              }`}
              name="maxHoursPerWeek"
              type="number"
              required
              defaultValue={maxHoursPerWeek}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="paidHours"
            >
              Paid Hours
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly={mode === "view"}
              className={`border-gray-200 appearance-none rounded w-full py-2 px-4 dark:bg-gray-800 bg-gray-200 font-bold dark:text-white text-black leading-tight ${
                mode === "view"
                  ? " dark:bg-gray-600"
                  : " border-gray-500 border-2 dark:bg-gray-900 focus:border-blue-800 hover:border-blue-500"
              }`}
              name="paidHours"
              type="number"
              required
              defaultValue={paidHours}
            />
          </div>
        </div>
        <div className="border-t border-solid border-blueGray-200 rounded-b w-[95%] mt-2 mb-4" />
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block dark:text-gray-500 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="weeklyAdvance"
            >
              Weekly Advance
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly
              className="dark:bg-gray-800 font-bold w-full rounded py-2 px-4 leading-tight"
              name="weeklyAdvance"
              type="text"
              value={`${calculateWeeklyAvailableAdvance(
                hourlyWage,
                paidHours,
                maxHoursPerWeek
              ).toFixed(2)} £`}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="monthlyAdvance"
            >
              Monthly Advance
            </label>
          </div>
          <div className="md:w-7/12">
            <input
              readOnly
              className="dark:bg-gray-800 font-bold rounded w-full py-2 px-4 leading-tight"
              name="monthlyAdvance"
              type="text"
              value={`${calculateMonthlyAvailableAdvance(
                hourlyWage,
                paidHours,
                maxHoursPerWeek
              ).toFixed(2)} £`}
            />
          </div>
        </div>
        <div className="flex items-center justify-end px-2">
          {mode === "edit" && (
            <button
              className="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline text-white font-bold py-2 px-4 rounded mr-3"
              type="submit"
            >
              Save
            </button>
          )}
          <button
            className="shadow bg-gray-900 hover:bg-gray-700 focus:shadow-outline text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
