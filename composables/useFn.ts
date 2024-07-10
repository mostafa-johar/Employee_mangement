export default function () {
  return useState("employee", () => {
    interface employees {
      name: string;
      email: string;
      salary: number;
      birthdate: string;
      status: string;
    }

    // --- states ----

    const inputs = reactive({
      fname: "",
      lname: "",
      email: "",
      salary: 0,
      birthdate: "",
      status: "",
    });
    const employees = ref<employees[]>([]);
    
    // --- getData from dataBase  ---

    const { data, refresh } = useFetch("/api/home");
    employees.value = data.value.employees;
    
   
    return { employees, inputs   };
  });
}
