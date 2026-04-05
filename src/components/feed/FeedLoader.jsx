import Navbar from "./Navbar";

export default function FeedLoader() {
  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <Navbar />
        <div
          className="container _custom_container"
          style={{ paddingTop: "40px" }}
        >
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-12">
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid #e0e0e0",
                    borderTop: "3px solid #377DFF",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto",
                  }}
                />
                <style>
                  {"@keyframes spin { to { transform: rotate(360deg); } }"}
                </style>
                <p style={{ marginTop: "16px", color: "#999" }}>
                  Loading feed...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
