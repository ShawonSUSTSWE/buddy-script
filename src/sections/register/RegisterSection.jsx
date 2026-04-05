"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegistrationForm from "@/components/register/RegistrationForm";

export default function RegisterSection() {
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
              <button
                type="button"
                className="_social_registration_content_btn _mar_b40"
              >
                <img
                  src="assets/images/google.svg"
                  alt="Image"
                  className="_google_img"
                />
                <span>Register with google</span>
              </button>
              <div className="_social_registration_content_bottom_txt _mar_b40">
                <span>Or</span>
              </div>

              {error && (
                <div
                  className="alert alert-danger py-2 mb-3"
                  style={{ fontSize: "13px" }}
                >
                  {error}
                </div>
              )}

              <RegistrationForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                loading={loading}
              />

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
