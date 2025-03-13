import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { login } from "../../services/userServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  email: z
    .string()
    .email({ message: "please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atlease 8 characters" }),
});
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [formError, setFormError] = useState("");
  let navigate = useNavigate();
  async function onSubmit(formData) {
    try {
      await login(formData);

      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  }
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter Your Email"
              // {...register("email", { required: true, minLength: 3 })}
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
            {/* {errors.name?.type === "minLength" && (
              <em className="form_error">Please enter minimum letters</em>
            )} */}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter Your Password"
              // {...register("password", { valueAsNumber: true })}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <em className="form_error">{errors.password.message}</em>
          )}

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
