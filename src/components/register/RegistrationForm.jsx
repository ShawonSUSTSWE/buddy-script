export default function RegistrationForm({
  handleChange,
  handleSubmit,
  formData,
  loading,
}) {
  return (
    <form className="_social_registration_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
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
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
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
            <label className="_social_registration_label _mar_b8">Email</label>
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
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
