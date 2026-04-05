const PhotoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#666"
      d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"
    />
  </svg>
);

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="24"
    fill="none"
    viewBox="0 0 22 24"
  >
    <path
      fill="#666"
      d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    className="_mar_img"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="13"
    fill="none"
    viewBox="0 0 14 13"
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={active ? "#377DFF" : "#666"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4"
    />
  </svg>
);

function ActionButton({ icon, label }) {
  return (
    <div
      className={`_feed_inner_text_area_bottom_${label.toLowerCase()} _feed_common`}
    >
      <button type="button" className="_feed_inner_text_area_bottom_photo_link">
        <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
          {icon}
        </span>
        {label}
      </button>
    </div>
  );
}

function PrivateToggle({ isPrivate, onChange }) {
  return (
    <div
      className="_feed_common"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          fontSize: "13px",
          color: "#666",
        }}
      >
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => onChange(e.target.checked)}
          style={{ accentColor: "#377DFF" }}
        />
        <LockIcon active={isPrivate} />
        Private
      </label>
    </div>
  );
}

function PostButton({ loading, disabled, onClick }) {
  return (
    <div className="_feed_inner_text_area_btn">
      <button
        type="button"
        className="_feed_inner_text_area_btn_link"
        onClick={onClick}
        disabled={disabled}
      >
        <SendIcon />
        <span>{loading ? "Posting..." : "Post"}</span>
      </button>
    </div>
  );
}

function DesktopActions({
  isPrivate,
  onPrivateChange,
  loading,
  disabled,
  onSubmit,
}) {
  return (
    <div className="_feed_inner_text_area_bottom">
      <div className="_feed_inner_text_area_item">
        <ActionButton icon={<PhotoIcon />} label="Photo" />
        <ActionButton icon={<VideoIcon />} label="Video" />
        <PrivateToggle isPrivate={isPrivate} onChange={onPrivateChange} />
      </div>
      <PostButton loading={loading} disabled={disabled} onClick={onSubmit} />
    </div>
  );
}

function MobileActions({ loading, disabled, onSubmit }) {
  return (
    <div className="_feed_inner_text_area_bottom_mobile">
      <div className="_feed_inner_text_mobile">
        <div
          className="_feed_inner_text_area_item"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            className="_feed_inner_text_area_bottom_photo _feed_common"
            style={{ flexShrink: 0 }}
          >
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge">
                <PhotoIcon />
              </span>
            </button>
          </div>

          <div
            className="_feed_inner_text_area_bottom_video _feed_common"
            style={{ flexShrink: 0 }}
          >
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge">
                <VideoIcon />
              </span>
            </button>
          </div>
        </div>

        <PostButton loading={loading} disabled={disabled} onClick={onSubmit} />
      </div>
    </div>
  );
}

export { DesktopActions, MobileActions };
