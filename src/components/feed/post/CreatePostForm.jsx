// components/feed/post/CreatePostForm.jsx
"use client";

import { apiClient } from "@/lib/utils/ApiClient";
import { showSuccess } from "@/lib/utils/ToastUtils";
import { useState } from "react";
import { DesktopActions, MobileActions } from "./PostFormActions";

export default function CreatePostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    try {
      const post = await apiClient("/api/posts", {
        method: "POST",
        body: JSON.stringify({ content: content.trim(), isPrivate }),
      });
      setContent("");
      setIsPrivate(false);
      showSuccess("Post created!");
      onPostCreated?.(post);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !content.trim();

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div
          className="form-floating _feed_inner_text_area_box_form"
          style={{ width: "100%" }}
        >
          <textarea
            className="form-control _textarea"
            placeholder="Write something..."
            id="create-post-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: "80px", resize: "none" }}
          />
          <label
            className="_feed_textarea_label"
            htmlFor="create-post-textarea"
          >
            Write something...
          </label>
        </div>
      </div>

      <DesktopActions
        isPrivate={isPrivate}
        onPrivateChange={setIsPrivate}
        loading={loading}
        disabled={isDisabled}
        onSubmit={handleSubmit}
      />

      <MobileActions
        loading={loading}
        disabled={isDisabled}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
