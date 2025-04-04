import "./SignupPage.css";
import user from "../../assets/user.webp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, signup } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    cpassword: z.string(),
    deliveryAddress: z
      .string()
      .min(15, { message: "Address must be at least 15 characters." }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Confirm does not matching password",
    path: ["cpassword"],
  });
const SignupPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [formError, setFormError] = useState("");
  async function handleSubmitting(formData) {
    try {
      await signup(formData, profilePic);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  }
  const [profilePic, setProfilePic] = useState(null);
  function handleProfile(event) {
    setProfilePic(event.target.files[0]);
  }
  console.log(profilePic);
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(handleSubmitting)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={handleProfile}
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>
          {errors.name && <em className="form_error">{errors.name.message}</em>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <em className="form_error">{errors.email.message}</em>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <em className="form_error">{errors.password.message}</em>
          )}
          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword")}
            />
          </div>
          {errors.cpassword && (
            <em className="form_error">{errors.cpassword.message}</em>
          )}
          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="deliveryAddress"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
          </div>
        </div>
        {errors.address && (
          <em className="form_error">{errors.address.message}</em>
        )}
        {formError && <em className="form_error">{formError}</em>}
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
