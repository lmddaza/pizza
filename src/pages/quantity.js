import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";

const FormsFormik = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "What's your name?")
      .max(20, "What's your name?")
      .required("What's your name?"),

    lastName: Yup.string()
      .min(3, "What's your name?")
      .max(20, "What's your name?")
      .required("What's your name?"),

    email: Yup.string().required(
      "You'll use this when you log in and if you ever need to reset your password"
    ),

    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)."
      )
      .min(
        6,
        "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)"
      )
      .max(
        30,
        "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &)"
      ),

    date: Yup.date().required("Use date of birth"),

    pronouns: Yup.string().required("Select your pronoun"),
  });

  const [display, setDisplay] = useState();
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    axios
      .get("https://api.ahglab.com/api:W7k9W8HQ/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createUser = (values) => {
    axios
      .post("https://api.ahglab.com/api:W7k9W8HQ/users", values)
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = (id) => {
    axios
      .get(`https://api.ahglab.com/api:W7k9W8HQ/users/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = (id, values) => {
    axios
      .put(`https://api.ahglab.com/api:W7k9W8HQ/users/${id}`, values)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? response.data : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://api.ahglab.com/api:W7k9W8HQ/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.formik}>
      <h1>Formik Form</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          date: "",
          pronouns: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          createUser(values);
          resetForm();
          setDisplay("User created successfully!");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
            </div>

            <div>
              <label htmlFor="date">Date of Birth</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" />
            </div>

            <div>
              <label htmlFor="pronouns">Pronouns</label>
              <Field name="pronouns" as="select">
                <option value="">Select pronouns</option>
                <option value="she/her">She/Her</option>
                <option value="he/him">He/Him</option>
                <option value="they/them">They/Them</option>
              </Field>
              <ErrorMessage name="pronouns" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <div>{display}</div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
            <button onClick={() => getUser(user.id)}>Get User</button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsFormik;
