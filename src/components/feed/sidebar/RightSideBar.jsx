import YouMightLike from "./YouMightLike";
import FriendsList from "./FriendsList";
import { signOut } from "next-auth/react";

export default function RightSidebar({ session }) {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_right_sidebar_wrap">
        <div className="_layout_right_sidebar_inner">
          <div className="_right_inner_area _b_radious6 _padd_t24 _padd_b24 _padd_r24 _padd_l24 _feed_inner_area">
            <div
              className="_right_inner_area_content"
              style={{ textAlign: "center" }}
            >
              <img
                src={session?.user?.avatarUrl || "/assets/images/profile.png"}
                alt=""
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "12px",
                }}
              />
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  marginBottom: "4px",
                }}
              >
                {session?.user?.firstName} {session?.user?.lastName}
              </h5>
              <p style={{ fontSize: "13px", color: "#999" }}>
                {session?.user?.email}
              </p>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                style={{
                  marginTop: "16px",
                  padding: "8px 16px",
                  background: "none",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  color: "#ff6b6b",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#fff0f0")}
                onMouseOut={(e) => (e.target.style.background = "none")}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        <YouMightLike />
        <FriendsList />
      </div>
    </div>
  );
}
