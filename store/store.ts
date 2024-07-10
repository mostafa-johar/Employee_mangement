import { defineStore } from "pinia";

export const storeEmployee = defineStore("EmployessStore", () => {
  interface employees {
    name: string;
    email: string;
    salary: number;
    birthdate: string;
    status: string;
  }
  interface inputs {
    fname: string;
    lname: string;
    email: string;
    salary: number;
    birthdate: string;
    status: string;
  }

  // =================================================
  // --- States  ---
  // ==================================================

  var inputs = reactive<inputs>({
    fname: "",
    lname: "",
    email: "",
    salary: 0,
    birthdate: "",
    status: "",
  });
  const employees = ref<employees[]>([]);
  const active = ref(true);
  const Id = ref("");
  const showpopUp = ref(false);
  let x = [];

  // Reset
  function Reset() {
    inputs.fname = "";
    inputs.lname = "";
    inputs.email = "";
    inputs.salary = 0;
    inputs.birthdate = "";
    inputs.status = "";
  }

  // =================================================
  // --- getData [fetch] from dataBase   ---
  // ==================================================
  async function getData() {
    const data = await $fetch("/api/home");
    employees.value = data.employees;
  }
  getData();

  // =================================================
  // --- post & Put (create) new employee to dataBase  ---
  // ==================================================
  async function submitFn(method: string) {
    let check = false;

    let body = {
      name: `${inputs.fname} ${inputs.lname}`,
      email: inputs.email,
      salary: inputs.salary,
      birthdate: inputs.birthdate,
      status: inputs.status,
    };

    const uniqueEmp = employees.value.filter((item) => {
      return item.email == inputs.email;
    });

    if (uniqueEmp.length) {
      alert("Email must be unique");
      return;
    }

    if (method == "POST") {
      const createEmp = await $fetch("/api/home", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (createEmp) {
        check = true;
        employees.value.push(body);
      }
    }

    if (method == "PUT") {
      const updateEmp = await $fetch(`/api/home/${Id.value}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (updateEmp) {
        check = true;
        getData();
      }
    }

    if (check) {
      Reset();
      active.value = true;
      check = false;
    }
  }

  // =================================================
  // --- actions  ---
  // ==================================================

  // update
  function updateEmployee(id: string) {
    active.value = false;
    Id.value = id;
    const w = [...employees.value].filter((item: any) => {
      return item._id == id;
    });

    inputs.fname = w[0].name.split(" ")[0];
    inputs.lname = w[0].name.split(" ").splice(1).join(" ");
    inputs.email = w[0].email;
    inputs.salary = w[0].salary;
    inputs.birthdate = w[0].birthdate;
    inputs.status = w[0].status;
  }

  // delete
  async function deleteEmployee(id: string) {
    const deleteEmp = await $fetch(`/api/home/${id}`, {
      method: "DELETE",
    });
    if (deleteEmp) {
      employees.value = employees.value.filter((item: any) => {
        return item._id !== id;
      });
      //  close popUp
      showpopUp.value = false;
    }
  }

  return {
    employees,
    inputs,
    active,
    showpopUp,
    updateEmployee,
    submitFn,
    deleteEmployee,
  };
});
