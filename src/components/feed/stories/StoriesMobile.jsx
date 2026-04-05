const mobileStories = [
  {
    img: "/assets/images/mobile_story_img.png",
    imgClass: "_card_story_img",
    label: "Your Story",
    labelClass: "_feed_inner_ppl_card_area_link_txt",
    isOwn: true,
  },
  {
    img: "/assets/images/mobile_story_img1.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_active",
  },
  {
    img: "/assets/images/mobile_story_img2.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_inactive",
  },
  {
    img: "/assets/images/mobile_story_img1.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_active",
  },
  {
    img: "/assets/images/mobile_story_img2.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_inactive",
  },
  {
    img: "/assets/images/mobile_story_img1.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_active",
  },
  {
    img: "/assets/images/mobile_story_img.png",
    imgClass: "_card_story_img",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story",
  },
  {
    img: "/assets/images/mobile_story_img1.png",
    imgClass: "_card_story_img1",
    label: "Ryan...",
    labelClass: "_feed_inner_ppl_card_area_txt",
    storyClass: "_feed_inner_ppl_card_area_story_active",
  },
];

export default function StoriesMobile() {
  return (
    <div className="_feed_inner_ppl_card_mobile _mar_b16">
      <div className="_feed_inner_ppl_card_area">
        <ul className="_feed_inner_ppl_card_area_list">
          {mobileStories.map((story, i) => (
            <li key={i} className="_feed_inner_ppl_card_area_item">
              <a href="#0" className="_feed_inner_ppl_card_area_link">
                <div
                  className={
                    story.isOwn
                      ? "_feed_inner_ppl_card_area_story"
                      : story.storyClass
                  }
                >
                  <img src={story.img} alt="Image" className={story.imgClass} />
                  {story.isOwn && (
                    <div className="_feed_inner_ppl_btn">
                      <button
                        className="_feed_inner_ppl_btn_link"
                        type="button"
                      >
                        <img
                          src="/assets/icons/story-add-mobile.svg"
                          alt="Add story"
                          width={12}
                          height={12}
                        />
                      </button>
                    </div>
                  )}
                </div>
                <p className={story.labelClass}>{story.label}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
