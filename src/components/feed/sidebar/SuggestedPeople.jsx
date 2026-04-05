export default function SuggestedPeople() {
  const people = [
    {
      name: "Steve Jobs",
      role: "CEO of Apple",
      img: "/assets/images/people1.png",
      imgClass: "_info_img",
    },
    {
      name: "Ryan Roslansky",
      role: "CEO of Linkedin",
      img: "/assets/images/people2.png",
      imgClass: "_info_img1",
    },
    {
      name: "Dylan Field",
      role: "CEO of Figma",
      img: "/assets/images/people3.png",
      imgClass: "_info_img1",
    },
  ];

  return (
    <div className="_layout_left_sidebar_inner">
      <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_left_inner_area_suggest_content _mar_b24">
          <h4 className="_left_inner_area_suggest_content_title _title5">
            Suggested People
          </h4>
          <span className="_left_inner_area_suggest_content_txt">
            <a className="_left_inner_area_suggest_content_txt_link" href="#0">
              See All
            </a>
          </span>
        </div>
        {people.map((person) => (
          <div key={person.name} className="_left_inner_area_suggest_info">
            <div className="_left_inner_area_suggest_info_box">
              <div className="_left_inner_area_suggest_info_image">
                <a href="#0">
                  <img
                    src={person.img}
                    alt="Image"
                    className={person.imgClass}
                  />
                </a>
              </div>
              <div className="_left_inner_area_suggest_info_txt">
                <a href="#0">
                  <h4 className="_left_inner_area_suggest_info_title">
                    {person.name}
                  </h4>
                </a>
                <p className="_left_inner_area_suggest_info_para">
                  {person.role}
                </p>
              </div>
            </div>
            <div className="_left_inner_area_suggest_info_link">
              <a href="#0" className="_info_link">
                Connect
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
