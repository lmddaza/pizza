import React from "react";
import styles from "@/styles/Home.module.css";
import StandardForms from "@/components/StandardForms";
import Date from "@components/Date";
import FormikForm from "@/components/FormikForm";

export default function SignUp() {
  return (
    <div className="App">
      <br></br>

      <div className={"styles.container"}>
        <div className="row mt-5">
          <div className="col-md-6 border py-3">
            <StandardForms></StandardForms>
          </div>

          <div className="col-md-6 border py-3">
            <FormikForm></FormikForm>
          </div>
        </div>
      </div>
    </div>
  );
}
