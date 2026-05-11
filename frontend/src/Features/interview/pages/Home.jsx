import React, { useState } from "react";
import "../style/home.scss";

function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const maxChars = 5000;

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSelfDescriptionChange = (e) => {
    setSelfDescription(e.target.value);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setResume(files[0]);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">
          Create Your Custom <span className="highlight-pink">Interview Plan</span>
        </h1>
        <p className="home-subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      <main className="home">
        <div className="interview-input-group">
          {/* LEFT SECTION - Job Description */}
          <div className="left">
            <div className="section-header">
              <div className="header-content">
                <span className="icon">📋</span>
                <h2>Target Job Description</h2>
              </div>
              <span className="badge required-badge">REQUIRED</span>
            </div>
            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              maxLength={maxChars}
              className="textarea-input"
            />
            <div className="char-count">
              {jobDescription.length} / {maxChars} chars
            </div>
          </div>

          {/* RIGHT SECTION - Profile */}
          <div className="right">
            <div className="profile-section">
              <div className="section-header">
                <div className="header-content">
                  <span className="icon">👤</span>
                  <h2>Your Profile</h2>
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="resume-upload-section">
                <div className="upload-header">
                  <span>Upload Resume</span>
                  <span className="badge best-results-badge">BEST RESULTS</span>
                </div>
                <div
                  className="upload-area"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="upload-content">
                    <span className="upload-icon">☁️</span>
                    <p className="upload-text">Click to upload or drag & drop</p>
                    <p className="upload-subtext">PDF or DOCX (Max 5MB)</p>
                    {resume && (
                      <p className="resume-file-name">✓ {resume.name}</p>
                    )}
                  </div>
                  <input
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf,.docx"
                    onChange={handleResumeChange}
                    className="hidden-input"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="divider-section">
                <span className="divider-text">OR</span>
              </div>

              {/* Self Description Section */}
              <div className="self-description-section">
                <label htmlFor="selfDescription" className="section-label">
                  Quick Self-Description
                </label>
                <textarea
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience. If you don't have a resume handy..."
                  value={selfDescription}
                  onChange={handleSelfDescriptionChange}
                  className="textarea-input small"
                />
              </div>

              {/* Info Box */}
              <div className="info-box">
                <span className="info-icon">ℹ️</span>
                <p>
                  Either a <strong>Resume</strong> or a{" "}
                  <strong>Self Description</strong> is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="time-estimate">
            AI-Powered Strategy Generation · Approx 30s
          </div>
          <button className="primary-button generate-btn">
            ⭐ Generate My Interview Strategy
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
