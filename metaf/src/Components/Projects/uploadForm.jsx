import React, { useState } from "react";

const UploadForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // For storing selected files
  const [previews, setPreviews] = useState([]); // For storing file previews

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setMediaFiles(files);

    // Generate previews for all files
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.split("/")[0], // image, video, etc.
    }));
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const formData = new FormData();
      formData.append("username", localStorage.getItem("username"));
      formData.append("title", title);
      formData.append("description", description);

      // Append all media files to FormData
      mediaFiles.forEach((file) => formData.append("media", file));

      onSubmit(formData); // Pass the form data to parent

      // Reset the form
      setTitle("");
      setDescription("");
      setMediaFiles([]);
      setPreviews([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaChange}
        required
      />

      {/* Preview Container */}
      {previews.length > 0 && (
        <div className="preview-container" style={{ marginTop: "10px" }}>
          {previews.map((preview, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  style={{ width: "300px", height: "auto" }}
                />
              ) : preview.type === "video" ? (
                <video controls style={{ width: "300px", height: "auto" }}>
                  <source src={preview.url} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div>Unsupported file type</div>
              )}
            </div>
          ))}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Project"}
      </button>
    </form>
  );
};

export default UploadForm;
