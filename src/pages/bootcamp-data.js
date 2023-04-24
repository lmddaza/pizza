import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/styles/Home.module.css";

const API_URL = "https://api.ahglab.com/api:W7k9W8HQ/users";

const validationSchema = Yup.object().shape({
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  credentials: Yup.string().required("Credentials is required"),
  birthdate: Yup.date().required("Birthdate is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "custom"])
    .required("Gender is required"),
});

const initialValues = {
  last_name: "",
  first_name: "",
  gender: "",
  birthdate: "",
  credentials: "",
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (showTable) {
      axios
        .get(API_URL)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Failed to fetch users");
        });
    }
  }, [showTable]);

  const handleGet = () => {
    setShowTable(true);
    setErrorMessage(null);
  };
  const handleGetUser = (userId) => {
    axios
      .get(`${API_URL}/${userId}`)
      .then((response) => {
        setSelectedUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Failed to get user");
      });
  };

  const handleEdit = (user) => {
    // Check if gender is null before setting selected user state
    const editedUser = { ...user, gender: user.gender || "" };
    setSelectedUser(editedUser);
  };

  const handleDelete = (userId) => {
    axios
      .delete(`${API_URL}/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Failed to delete user");
      });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (selectedUser) {
      axios
        .put(`${API_URL}/${selectedUser.id}`, values)
        .then((response) => {
          setUsers(
            users.map((user) =>
              user.id === response.data.id ? response.data : user
            )
          );
          setSelectedUser(null);
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Failed to update user");
          setSubmitting(false);
        });
    } else {
      axios
        .post(API_URL, values)
        .then((response) => {
          setUsers([...users, response.data]);
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Failed to create user");
          setSubmitting(false);
        });
    }
  };

  return (
    <div>
      <button onClick={handleGet}>Get Users</button>
      {errorMessage && <p>{errorMessage}</p>}
      {showTable && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Credentials</th>
                <th>Birthdate</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.last_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.credentials}</td>
                  <td>{user.birthdate}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button onClick={() => handleGetUser(user.id)}>View</button>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUser && (
            <Formik
              initialValues={{
                last_name: selectedUser.last_name,
                first_name: selectedUser.first_name,
                gender: selectedUser.gender || "",
                birthdate: selectedUser.birthdate,
                credentials: selectedUser.credentials,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Field type="text" name="last_name" />
                    <ErrorMessage name="last_name" />
                  </div>
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <Field type="text" name="first_name" />
                    <ErrorMessage name="first_name" />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <Field as="select" name="gender">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="custom">Custom</option>
                    </Field>
                    <ErrorMessage name="gender" />
                  </div>
                  <div>
                    <label htmlFor="birthdate">Birthdate</label>
                    <Field type="date" name="birthdate" />
                    <ErrorMessage name="birthdate" />
                  </div>
                  <div>
                    <label htmlFor="credentials">Credentials</label>
                    <Field type="text" name="credentials" />
                    <ErrorMessage name="credentials" />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    {selectedUser ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => setSelectedUser(null)}>
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};
export default App;
