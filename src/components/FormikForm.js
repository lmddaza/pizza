import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export class FormikForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    invalid: false,
  };
  handleChange = (values) => {
    this.setState({
      userName: values.userName,
      usernames: values.usernames,
      email: values.email,
      password: values.password,
    });
  };
  validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(6, "What's your name?")
      .max(15, "What's your name?")
      .required("Required"),

    usernames: Yup.string()
      .min(6, "What's your name?")
      .max(15, "What's your name?")
      .required("Required"),

    email: Yup.string()
      .email(
        "You'll use this when you log in and if you ever eed to reset your password"
      )
      .required("Required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
  });

  render() {
    return (
      <div>
        <h1>SignUp </h1>
        <Formik
          initialValues={{
            userName: "",
            usernames: "",
            email: "",
            password: "",
            isSubmitting: true,
          }}
          validationSchema={this.validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(true);
              resetForm();
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            dirty,
            handleChange,
            handlBlur,
            handleReset,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="userName"></label>
                <input
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="First name"
                  onBlur={handlBlur}
                />
                <span className="form-text text-danger">
                  {errors.userName && touched.userName && errors.userName}
                </span>

                <label htmlFor="usernames"></label>
                <input
                  type="text"
                  name="usernames"
                  value={values.usernames}
                  onChange={handleChange}
                  className="form-control"
                  placeholder=" Last name"
                  onBlur={handlBlur}
                />
                <span className="form-text text-danger">
                  {errors.usernames && touched.usernames && errors.usernames}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  onBlur={handlBlur}
                />
                <span className="form-text text-danger">
                  {errors.email && touched.email && errors.email}{" "}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  onBlur={handlBlur}
                />
              </div>
              <div className="btn-group">
                <button className="btn btn-primary" type="submit">
                  {" "}
                  Sign up{" "}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
export default FormikForm;
