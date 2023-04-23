import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  last_name: "",
  first_name: "",
  gender: "",
  birthdate: "",
  credentials: "",
};

const validationSchema = Yup.object().shape({
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  gender: Yup.string().required("Gender is required"),
  birthdate: Yup.string().required("Birthdate is required"),
  credentials: Yup.string().required("Credentials are required"),
});

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios("https://api.ahglab.com/api:W7k9W8HQ/users");
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIsError(false);

    try {
      await axios.delete(`https://api.ahglab.com/api:W7k9W8HQ/users/${id}`);
      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      setIsError(true);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsError(false);

    try {
      if (selectedUser) {
        await axios.put(
          `https://api.ahglab.com/api:W7k9W8HQ/users/${selectedUser.id}`,
          values
        );
        const updatedData = data.map((user) =>
          user.id === selectedUser.id ? { ...user, ...values } : user
        );
        setData(updatedData);
        setSelectedUser(null);
      } else {
        const result = await axios.post(
          "https://api.ahglab.com/api:W7k9W8HQ/users",
          values
        );
        setData([...data, result.data]);
      }

      resetForm();
    } catch (error) {
      setIsError(true);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Gender</th>
            <th>Birthdate</th>
            <th>Credentials</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.last_name}</td>
              <td>{user.first_name}</td>
              <td>{user.gender}</td>
              <td>{user.birthdate}</td>
              <td>{user.credentials}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
      <Formik
        initialValues={selectedUser || initialValues}
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
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
              {selectedUser ? "Update" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
