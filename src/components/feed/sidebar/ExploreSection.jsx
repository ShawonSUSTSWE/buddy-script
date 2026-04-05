const exploreItems = [
  {
    label: "Learning",
    icon: "/assets/icons/learning.svg",
    width: 20,
    height: 20,
    badge: "New",
  },
  {
    label: "Insights",
    icon: "/assets/icons/insights.svg",
    width: 22,
    height: 24,
  },
  {
    label: "Find friends",
    icon: "/assets/icons/find-friends.svg",
    width: 22,
    height: 24,
  },
  {
    label: "Bookmarks",
    icon: "/assets/icons/bookmarks.svg",
    width: 22,
    height: 24,
  },
  { label: "Group", icon: "/assets/icons/group.svg", width: 22, height: 22 },
  {
    label: "Gaming",
    icon: "/assets/icons/gaming.svg",
    width: 22,
    height: 24,
    badge: "New",
  },
  {
    label: "Settings",
    icon: "/assets/icons/settings.svg",
    width: 24,
    height: 24,
  },
  {
    label: "Save post",
    icon: "/assets/icons/save-post.svg",
    width: 22,
    height: 22,
  },
];

export default function ExploreSection() {
  return (
    <div className="_layout_left_sidebar_inner">
      <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <h4 className="_left_inner_area_explore_title _title5 _mar_b24">
          Explore
        </h4>
        <ul className="_left_inner_area_explore_list">
          {exploreItems.map((item) => (
            <li
              key={item.label}
              className={`_left_inner_area_explore_item ${item.badge ? "_explore_item" : ""}`}
            >
              <a href="#0" className="_left_inner_area_explore_link">
                <img
                  src={item.icon}
                  alt=""
                  style={{
                    width: item.width,
                    height: item.height,
                    minWidth: item.width,
                    marginRight: "12px",
                  }}
                />
                {item.label}
              </a>
              {item.badge && (
                <span className="_left_inner_area_explore_link_txt">
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
