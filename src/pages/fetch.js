import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";

const FormsFormik = () => {
  const api = "https://api.ahglab.com/api:W7k9W8HQ/users";
  const [data, setData] = useState(first_Name);
  function submit(e) {
    e.preventDefault();
    axios
      .post(api, {
        first_name: data.first_name,
        email: data.email,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

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
            first_Name: "",
          }}
        >
          {({ errors, touched, values }) => (
            <Form style={{ color: "black" }}>
              <div className={styles.infoContainer}>
                <div className={styles.nameContainer}>
                  <Field
                    id="first_Name"
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
              <p>
                Status:{" "}
                {postStatus === 200 ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : postStatus === 500 ? (
                  <span style={{ color: "red" }}>Failed</span>
                ) : (
                  "N/A"
                )}
              </p>

              {/* {data &&
                  data.splice(0, 10).map((value, key) => {
                    return (
                      // <p>
                      //   {key}: {value?.firstName}
                      // </p>
                    );
                  })} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormsFormik;
