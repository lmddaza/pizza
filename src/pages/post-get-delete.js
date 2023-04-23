import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

const API_ENDPOINT = "https://api.ahglab.com/api:W7k9W8HQ/users";

const UserForm = () => {
  const [users, setUsers] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post(API_ENDPOINT, values)
      .then((response) => {
        console.log(response);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGetUsers = () => {
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`${API_ENDPOINT}/${id}`)
      .then((response) => {
        console.log(response);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>User Form</h2>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          credentials: "",
          password: "",
          birthdate: "",
          gender: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <Field type="text" name="first_name" />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <Field type="text" name="last_name" />
          </div>
          <div>
            <label htmlFor="credentials">Credentials:</label>
            <Field type="text" name="credentials" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
          </div>
          <div>
            <label htmlFor="birthdate">Birthdate:</label>
            <Field type="date" name="birthdate" />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <Field as="select" name="gender">
              <option value="">Select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div>
        <button onClick={handleGetUsers}>Get Users</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Credentials</th>
              <th>Password</th>
              <th>Birthdate</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.credentials}</td>
                <td>{user.password}</td>
                <td>{user.birthdate}</td>
                <td>{user.gender}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserForm;
