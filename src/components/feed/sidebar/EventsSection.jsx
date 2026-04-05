const events = [
  {
    img: "/assets/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: 17,
  },
  {
    img: "/assets/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: 17,
  },
];

export default function EventsSection() {
  return (
    <div className="_layout_left_sidebar_inner">
      <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_left_inner_event_content">
          <h4 className="_left_inner_event_title _title5">Events</h4>
          <a href="#0" className="_left_inner_event_link">
            See all
          </a>
        </div>
        {events.map((event, i) => (
          <a key={i} className="_left_inner_event_card_link" href="#0">
            <div className="_left_inner_event_card">
              <div className="_left_inner_event_card_iamge">
                <img src={event.img} alt="Image" className="_card_img" />
              </div>
              <div className="_left_inner_event_card_content">
                <div className="_left_inner_card_date">
                  <p className="_left_inner_card_date_para">{event.day}</p>
                  <p className="_left_inner_card_date_para1">{event.month}</p>
                </div>
                <div className="_left_inner_card_txt">
                  <h4 className="_left_inner_event_card_title">
                    {event.title}
                  </h4>
                </div>
              </div>
              <hr className="_underline" />
              <div className="_left_inner_event_bottom">
                <p className="_left_iner_event_bottom">
                  {event.going} People Going
                </p>
                <p className="_left_iner_event_bottom_link">Going</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
