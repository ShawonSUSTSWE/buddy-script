const friends = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "/assets/images/people1.png",
    online: false,
    lastSeen: "5 minutes ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: "/assets/images/people2.png",
    online: true,
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "/assets/images/people3.png",
    online: true,
  },
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "/assets/images/people1.png",
    online: false,
    lastSeen: "5 minutes ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: "/assets/images/people2.png",
    online: true,
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "/assets/images/people3.png",
    online: true,
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "/assets/images/people3.png",
    online: true,
  },
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "/assets/images/people1.png",
    online: false,
    lastSeen: "5 minutes ago",
  },
];

export default function FriendsList() {
  return (
    <div className="_layout_right_sidebar_inner">
      <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_feed_top_fixed">
          <div className="_feed_right_inner_area_card_content _mar_b24">
            <h4 className="_feed_right_inner_area_card_content_title _title5">
              Your Friends
            </h4>
            <span className="_feed_right_inner_area_card_content_txt">
              <a
                className="_feed_right_inner_area_card_content_txt_link"
                href="#0"
              >
                See All
              </a>
            </span>
          </div>

          {/* Search — icon positioned inside input using relative/absolute */}
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <img
              src="/assets/icons/search.svg"
              alt=""
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "15px",
                height: "15px",
                pointerEvents: "none",
              }}
            />
            <input
              className="form-control _feed_right_inner_area_card_form_inpt"
              type="search"
              placeholder="Search friends..."
              aria-label="Search"
              style={{ paddingLeft: "32px" }}
            />
          </div>
        </div>

        <div className="_feed_bottom_fixed">
          {friends.map((friend, i) => (
            <div
              key={i}
              className={`_feed_right_inner_area_card_ppl ${!friend.online ? "_feed_right_inner_area_card_ppl_inactive" : ""}`}
            >
              <div className="_feed_right_inner_area_card_ppl_box">
                <div className="_feed_right_inner_area_card_ppl_image">
                  <a href="#0">
                    <img
                      src={friend.img}
                      alt=""
                      className="_box_ppl_img"
                      style={{
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                </div>
                <div className="_feed_right_inner_area_card_ppl_txt">
                  <a href="#0">
                    <h4 className="_feed_right_inner_area_card_ppl_title">
                      {friend.name}
                    </h4>
                  </a>
                  <p className="_feed_right_inner_area_card_ppl_para">
                    {friend.role}
                  </p>
                </div>
              </div>
              <div className="_feed_right_inner_area_card_ppl_side">
                {friend.online ? (
                  <img
                    src="/assets/icons/online-dot.svg"
                    alt="Online"
                    style={{ width: "14px", height: "14px", minWidth: "14px" }}
                  />
                ) : (
                  <span>{friend.lastSeen}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
