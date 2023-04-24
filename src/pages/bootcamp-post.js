import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  credentials: Yup.string().required("Credentials are required"),
  password: Yup.string().required("Password is required"),
  birthdate: Yup.date().required("Birthdate is required"),
  gender: Yup.string(),
});

const initialValues = {
  first_name: "",
  last_name: "",
  credentials: "",
  password: "",
  birthdate: "",
  gender: "",
};

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Custom", value: "custom" },
];

const onSubmit = (values, { setSubmitting, resetForm }) => {
  axios
    .post("https://api.ahglab.com/api:W7k9W8HQ/users", values)
    .then((response) => {
      console.log(response.data);
      alert("Form submitted successfully");
      resetForm();
    })
    .catch((error) => {
      console.log(error);
      alert("Form submission failed");
    })
    .finally(() => {
      setSubmitting(false);
    });
};

const UserForm = () => {
  return (
    <div>
      <h1>User Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Field type="text" id="first_name" name="first_name" />
              <ErrorMessage name="first_name" />
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" id="last_name" name="last_name" />
              <ErrorMessage name="last_name" />
            </div>
            <div>
              <label htmlFor="credentials">Credentials</label>
              <Field type="text" id="credentials" name="credentials" />
              <ErrorMessage name="credentials" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" />
            </div>
            <div>
              <label htmlFor="birthdate">Birthdate</label>
              <Field type="date" id="birthdate" name="birthdate" />
              <ErrorMessage name="birthdate" />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <Field as="select" id="gender" name="gender">
                <option value="">Select a gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="gender" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
