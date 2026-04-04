"use client";

import LoginForm from "@/components/login/LoginForm";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginSection() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/feed");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="_social_login_wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="_social_login_left">
              <div className="_social_login_left_image">
                <img
                  src="/assets/images/login.png"
                  alt="Login illustration"
                  className="_left_img"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <div className="_social_login_content">
              <div className="_social_login_left_logo _mar_b28">
                <img
                  src="/assets/images/logo.svg"
                  alt="Buddy Script"
                  className="_left_logo"
                />
              </div>
              <p className="_social_login_content_para _mar_b8">Welcome back</p>
              <h4 className="_social_login_content_title _titl4 _mar_b50">
                Login to your account
              </h4>
              <button
                type="button"
                className="_social_login_content_btn _mar_b40"
              >
                <img
                  src="assets/images/google.svg"
                  alt="Google sign in image"
                  className="_google_img"
                />{" "}
                <span>Or sign-in with google</span>
              </button>
              <div className="_social_login_content_bottom_txt _mar_b40">
                {" "}
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

              <LoginForm
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                email={email}
                password={password}
                loading={loading}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
              />
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="_social_login_bottom_txt">
                    <p className="_social_login_bottom_txt_para">
                      Don&apos;t have an account?{" "}
                      <Link href="/register">Create New Account</Link>
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
