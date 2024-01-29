import Employee from "./employeeInterface";

export async function getEmployees(): Promise<Employee[]> {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request(
    "https://6475b297e607ba4797dc5e3f.mockapi.io/api/v1/Employees",
    {
      method: "GET",
      headers: headers,
    }
  );

  const res = await fetch(request);
  const employees = await res.json();
  return employees as Employee[];
}

export async function updateEmployee(
  id: number,
  updatedEmployee: Employee
): Promise<void> {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request(
    `https://6475b297e607ba4797dc5e3f.mockapi.io/api/v1/Employees/${id}`,
    {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedEmployee),
    }
  );

  await fetch(request);
}

export async function deleteEmployee(id: string): Promise<void> {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request(
    `https://6475b297e607ba4797dc5e3f.mockapi.io/api/v1/Employees/${id}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );

  await fetch(request);
}
