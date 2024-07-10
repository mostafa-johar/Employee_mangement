<script setup>
import { storeEmployee } from "~/store/store";

useHead({
  title: "Employee management",
});

const store = storeEmployee();

const { employees, inputs, active, showpopUp } = storeToRefs(store);

const { updateEmployee, submitFn, deleteEmployee, PopUp } = store;

const method = computed(() => (active.value ? "POST" : "PUT"));

// to get id from table
const useID = ref("");

// to show popUp to delete [Yes o No]
const showpopUpFn = (id) => {
  showpopUp.value = true;
  useID.value = id;
};
</script>

<template>
  <div class="Home">
    <div class="container">
      <!-- popUp -->
      <div class="overlay" v-if="showpopUp"></div>
      <div class="delete_box" v-if="showpopUp">
        <p>Are you to sure to delete ?</p>
        <button @click="deleteEmployee(useID)">Yes</button>
        <button @click="showpopUp = !showpopUp">No</button>
      </div>

      <!-- title -->
      <h1 class="title">Employee Management</h1>

      <!-- form inputs -->

      <form id="employeeForm" @submit.prevent="submitFn(method)">
        <div class="form_controll">
          <input
            type="text"
            placeholder="FirstName"
            v-model="inputs.fname"
            required
          />
          <input
            type="text"
            placeholder="LastName"
            v-model="inputs.lname"
            required
          />
        </div>
        <div class="form_controll">
          <input
            type="email"
            placeholder="Email"
            v-model="inputs.email"
            required
          />
          <input
            type="number"
            placeholder="Salary"
            min="0"
            v-model="inputs.salary"
            required
          />
        </div>

        <div class="form_controll">
          <section for="Birthdate" class="Birthdate">
            <label for="Birthdate">Birthdate</label>
            <input
              type="date"
              id="Birthdate"
              v-model="inputs.birthdate"
              required
            />
          </section>
          <section class="status">
            <label for="active">
              <span>active</span>
              <input
                type="radio"
                name="status"
                id="active"
                v-model="inputs.status"
                value="active"
                required
              />
            </label>
            <label for="inactive">
              <span>inactive</span>
              <input
                type="radio"
                name="status"
                id="inactive"
                v-model="inputs.status"
                value="inactive"
                required
              />
            </label>
          </section>
        </div>

        <button type="submit" class="addBtn" v-if="active">Add +</button>
        <button type="submit" class="addBtn update" v-else>Update</button>
      </form>

      <!-- table -->
      <section class="tableBox">
        <table width="100%">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Birthdate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            <tr v-for="employee in employees" :key="employee._id">
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>${{ employee.salary }}</td>
              <td>{{ employee.birthdate }}</td>
              <td :class="employee.status == 'active' ? 'active' : 'inactive'">
                {{ employee.status }}
              </td>
              <td class="edit_and_delete">
                <button @click="updateEmployee(employee._id)">📝</button>
                <button @click="showpopUpFn(employee._id)">❌</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
