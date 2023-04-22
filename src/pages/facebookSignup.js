import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import * as Yup from "yup";

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
  return (
    <div className={styles.formikContainer}>
      <div className={styles.formContainer}>
        <div className={styles.signup}>
          <h1
            style={{
              color: "black",
              fontFamily: "sans-serif",
              fontSize: "32px",
            }}
          >
            Sign Up
          </h1>
          <p
            style={{
              color: "grey",
              fontFamily: "sans-serif",
              fontSize: "15px",
            }}
          >
            It's quick and easy. <br></br> <br></br>
          </p>{" "}
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            inputGender: "",
            date: "",
            pronouns: "",
          }}
          onSubmit={(values, actions) => {
            setDisplay(
              <p>
                {" "}
                Name: ${values?.firstName} ${values?.lastName}
              </p>,
              <p> my email is ${values?.email}.</p>,
              <p> I was born on ${values?.date}.</p>,
              <p> My pronouns are ${values?.pronouns}.</p>
            );

            actions.resetForm({
              values: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                date: "",
                gender: "",
                pronouns: "",
                inputGender: "",
              },
            });
          }}
          validationSchema={SignupSchema}
        >
          {({ errors, touched, values }) => (
            <Form style={{ color: "black" }}>
              <div className={styles.infoContainer}>
                <div className={styles.nameContainer}>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className={styles.name}
                  />
                  <ErrorMessage name="firstName" />
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    className={styles.name}
                  />
                  <ErrorMessage name="lastName" />
                </div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Mobile number or email"
                  className={styles.emailPass}
                />
                <ErrorMessage name="email" />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New password"
                  className={styles.emailPass}
                />
                <ErrorMessage name="password" />

                <p
                  style={{
                    color: "grey",
                    fontFamily: "Arial",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  Birthday
                </p>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  className={styles.datePicker}
                />
                <ErrorMessage name="date" />
                <p
                  style={{
                    color: "grey",
                    fontFamily: "Arial",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  Gender
                </p>
                <div className={styles.genderButtonsContainer}>
                  <div className={styles.genderButtons}>
                    <label htmlFor="male">Male</label>
                    <Field type="radio" id="male" name="gender" value="Male" />
                  </div>
                  <div className={styles.genderButtons}>
                    <label htmlFor="female">Female</label>
                    <Field
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                    />
                  </div>
                  <div className={styles.genderButtons}>
                    <label htmlFor="custom">Custom</label>
                    <Field
                      type="radio"
                      id="custom"
                      name="gender"
                      value="Custom"
                    />
                  </div>
                </div>
                {values?.gender == "Custom" && (
                  <div className={styles.pronounsContainer}>
                    <Field
                      id="pronouns"
                      name="pronouns"
                      placeholder="Select your pronoun"
                      as="select"
                      className={styles.pronouns}
                    >
                      <option value="" default>
                        Select your pronoun
                      </option>
                      <option value="She">
                        She: "Wish her a happy birthday!"
                      </option>
                      <option value="He">
                        He: "Wish him a happy birthday!"
                      </option>
                      <option value="They">
                        Them: "Wish them a happy birthday!"
                      </option>
                    </Field>
                    {/* <ErrorMessage name="pronouns" /> */}
                    <p
                      style={{
                        color: "grey",
                        fontFamily: "Arial",
                        fontSize: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      Your pronoun is visible to everyone.
                    </p>
                    <Field
                      id="gender"
                      name="inputGender"
                      placeholder="Gender (Optional)"
                      className={styles.emailPass}
                    />
                  </div>
                )}
                <p
                  style={{
                    color: "grey",
                    fontFamily: "Arial",
                    fontSize: "11px",
                    marginBottom: "10px",
                  }}
                >
                  People who use our service may have uploaded your contact
                  information to Facebook. Learn more.
                  <br />
                  <br />
                  By clicking Sign Up, you agree to our Terms, Privacy Policy
                  and Cookies Policy. You may receive SMS Notifications from us
                  and can opt out any time.
                </p>
                <div className={styles.submitBtnContainer}>
                  <button type="submit" className={styles.submitButton}>
                    <h3> Sign up</h3>
                  </button>
                </div>
                <p>{display}</p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormsFormik;
