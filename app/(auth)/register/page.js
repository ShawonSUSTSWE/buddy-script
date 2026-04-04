"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="_social_registration_wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="_social_registration_right">
              <div className="_social_registration_right_image">
                <img
                  src="/assets/images/registration.png"
                  alt="Registration illustration"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <div className="_social_registration_content">
              <div className="_social_registration_right_logo _mar_b28">
                <img
                  src="/assets/images/logo.svg"
                  alt="Buddy Script"
                  className="_right_logo"
                />
              </div>
              <p className="_social_registration_content_para _mar_b8">
                Get Started Now
              </p>
              <h4 className="_social_registration_content_title _titl4 _mar_b50">
                Registration
              </h4>

              {error && (
                <div
                  className="alert alert-danger py-2 mb-3"
                  style={{ fontSize: "13px" }}
                >
                  {error}
                </div>
              )}

              <form
                className="_social_registration_form"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control _social_registration_input"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        id="register-firstname"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control _social_registration_input"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        id="register-lastname"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control _social_registration_input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        id="register-email"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control _social_registration_input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        id="register-password"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">
                        Repeat Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control _social_registration_input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        id="register-confirm-password"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                      <button
                        type="submit"
                        className="_social_registration_form_btn_link _btn1"
                        disabled={loading}
                        id="register-submit"
                      >
                        {loading ? "Creating account..." : "Register now"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="_social_registration_bottom_txt">
                    <p className="_social_registration_bottom_txt_para">
                      Already have an account?{" "}
                      <Link href="/login">Login here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
