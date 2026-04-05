const stories = [
  {
    img: "/assets/images/card_ppl2.png",
    name: "Ryan Roslansky",
    mini: "/assets/images/mini_pic.png",
    colClass: "col-xl-3 col-lg-3 col-md-4 col-sm-4 col",
  },
  {
    img: "/assets/images/card_ppl3.png",
    name: "Ryan Roslansky",
    mini: "/assets/images/mini_pic.png",
    colClass: "col-xl-3 col-lg-3 col-md-4 col-sm-4 _custom_mobile_none",
  },
  {
    img: "/assets/images/card_ppl4.png",
    name: "Ryan Roslansky",
    mini: "/assets/images/mini_pic.png",
    colClass: "col-xl-3 col-lg-3 col-md-4 col-sm-4 _custom_none",
  },
];

export default function StoriesDesktop() {
  return (
    <div className="_feed_inner_ppl_card _mar_b16">
      <div className="_feed_inner_story_arrow">
        <button type="button" className="_feed_inner_story_arrow_btn">
          <img
            src="/assets/icons/story-arrow.svg"
            alt=""
            width={9}
            height={8}
          />
        </button>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
          <div className="_feed_inner_profile_story _b_radious6">
            <div className="_feed_inner_profile_story_image">
              <img
                src="/assets/images/card_ppl1.png"
                alt="Image"
                className="_profile_story_img"
              />
              <div className="_feed_inner_story_txt">
                <div className="_feed_inner_story_btn">
                  <button className="_feed_inner_story_btn_link">
                    <img
                      src="/assets/icons/story-add.svg"
                      alt="Add story"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                <p className="_feed_inner_story_para">Your Story</p>
              </div>
            </div>
          </div>
        </div>
        {stories.map((story, i) => (
          <div key={i} className={story.colClass}>
            <div className="_feed_inner_public_story _b_radious6">
              <div className="_feed_inner_public_story_image">
                <img
                  src={story.img}
                  alt="Image"
                  className="_public_story_img"
                />
                <div className="_feed_inner_pulic_story_txt">
                  <p className="_feed_inner_pulic_story_para">{story.name}</p>
                </div>
                <div className="_feed_inner_public_mini">
                  <img
                    src={story.mini}
                    alt="Image"
                    className="_public_mini_img"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
