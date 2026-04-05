import ExploreSection from "./ExploreSection";
import SuggestedPeople from "./SuggestedPeople";
import EventsSection from "./EventsSection";

export default function LeftSidebar() {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_left_sidebar_wrap">
        <ExploreSection />
        <SuggestedPeople />
        <EventsSection />
      </div>
    </div>
  );
}
