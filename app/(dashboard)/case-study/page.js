"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaArrowLeft,
  FaImage,
} from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import Notification from "@/components/Notification";
import { useEditor } from "@tiptap/react";

const EditorContent = dynamic(() => import("@tiptap/react").then(mod => mod.EditorContent), { ssr: false });

const ToolbarButton = ({ onClick, isActive, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded ${
      isActive ? "bg-black text-white" : "bg-white text-black"
    } hover:bg-gray-200 transition`}
    title={label}
  >
    <Icon size={16} />
  </button>
);

const CaseStudyPage = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    video: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type = "image") => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("/api/upload", formData);
      setData((prev) => ({ ...prev, [type]: res.data.url }));
      showNotification(`${type === "image" ? "Image" : "Video"} uploaded successfully!`);
      setError("");
    } catch {
      setError(`${type === "image" ? "Image" : "Video"} upload failed`);
      showNotification(`${type === "image" ? "Image" : "Video"} upload failed`, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/create", data);
      showNotification("Case study submitted successfully!");
      setError("");
    } catch {
      setError("Submission failed");
      showNotification("Submission failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div
        className="flex items-center gap-2 mb-6 cursor-pointer text-black hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </div>

      <h2 className="text-3xl font-bold mb-6">Create Case Study</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter case study title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter a short description"
            rows={3}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <div className="flex gap-2 mb-3 flex-wrap">
            <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} isActive={editor?.isActive("bold")} icon={FaBold} label="Bold" />
            <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} isActive={editor?.isActive("italic")} icon={FaItalic} label="Italic" />
            <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} isActive={editor?.isActive("bulletList")} icon={FaListUl} label="Bulleted List" />
            <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} isActive={editor?.isActive("blockquote")} icon={FaQuoteRight} label="Quote" />
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()} isActive={editor?.isActive({ textAlign: "left" })} icon={FaAlignLeft} label="Align Left" />
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()} isActive={editor?.isActive({ textAlign: "center" })} icon={FaAlignCenter} label="Align Center" />
            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()} isActive={editor?.isActive({ textAlign: "right" })} icon={FaAlignRight} label="Align Right" />
            <ToolbarButton
              onClick={() => {
                const url = prompt("Enter URL");
                if (url) editor?.chain().focus().toggleLink({ href: url }).run();
              }}
              isActive={editor?.isActive("link")}
              icon={FaLink}
              label="Insert Link"
            />
          </div>
          <div className="border rounded bg-white p-3 min-h-[200px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Image</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition">
              <FaImage />
              <span>Choose Image</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
            </label>
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
          {data.image && (
            <div className="mt-3">
              <img src={data.image} alt="Uploaded preview" className="h-32 rounded shadow" />
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Video</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition">
              <MdVideoLibrary />
              <span>Choose Video</span>
              <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} className="hidden" />
            </label>
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
          {data.video && (
            <div className="mt-3">
              <video controls className="w-full max-w-md rounded shadow">
                <source src={data.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CaseStudyPage;
