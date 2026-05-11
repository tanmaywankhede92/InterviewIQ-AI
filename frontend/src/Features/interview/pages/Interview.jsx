import { useMemo, useState } from "react";
import "../style/interview.scss";

const sampleReport = {
  jobDescription:
    "I am looking for a Full-Stack Developer (MERN Stack) role where I can contribute to building scalable web applications, responsive user interfaces, and efficient backend systems. I am interested in opportunities that involve working with React.js, Node.js, Express.js, and MongoDB while collaborating with teams to develop real-world digital products. I am seeking a position where I can further strengthen my skills in frontend and backend development, API integration, performance optimization, deployment, and production management. I am particularly interested in roles that provide exposure to modern development workflows, problem-solving, and end-to-end product development in a growth-oriented environment.",
  selfDescription:
    "I am a Full-Stack Developer specializing in MERN stack development with experience in building scalable web applications, RESTful APIs, and responsive user interfaces. I have worked on end-to-end application development, including frontend development with React.js, backend systems using Node.js and Express.js, and database management with MongoDB. I have professional experience at Weqode Technologies and Iluam Tech Pvt Ltd, where I contributed to developing production-ready applications, improving performance, handling deployments, and collaborating on feature delivery. My technical skills include React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, Git, REST APIs, and deployment workflows.",
  technicalQuestions: [
    "How would you structure a MERN application for scalability?",
    "What are the key trade-offs between SQL and NoSQL databases?",
    "How do you optimize React rendering performance?"
  ],
  behaviouralQuestions: [
    "Describe a time you handled a difficult deadline.",
    "How do you collaborate with backend and frontend teams?"
  ],
  skillGaps: ["Message Queues", "Advanced Docker & CI/CD", "Distributed Systems Design", "Production-level Redis management"],
  preprationPlans: [
    "Deep dive into Node.js event loop, process.nextTick, and setImmediate.",
    "Review MongoDB indexing strategies and aggregation framework.",
    "Practice Redis caching patterns and TTL based cache invalidation.",
    "Study microservices patterns, API Gateway, and circuit breaker design.",
    "Learn message queue concepts with Kafka or RabbitMQ.",
    "Solve algorithms focusing on arrays, strings, and hash maps.",
    "Run a mock interview and review project experience bullets."
  ]
};

const sections = [
  { key: "technicalQuestions", label: "Technical Questions" },
  { key: "behaviouralQuestions", label: "Behavioral Questions" },
  { key: "preprationPlans", label: "Road Map" }
];

function Interview({ report = sampleReport }) {
  const [activeSection, setActiveSection] = useState("technicalQuestions");

  const roadmapItems = useMemo(
    () =>
      report.preprationPlans.map((text, index) => ({
        day: `Day ${index + 1}`,
        title: text.split(".")[0],
        bullets: [text]
      })),
    [report.preprationPlans]
  );

  const matchScore = 88;
  const piePercent = 72;

  const renderSectionContent = () => {
    switch (activeSection) {
      case "technicalQuestions":
        return report.technicalQuestions.length ? (
          <ul className="section-list">
            {report.technicalQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No technical questions have been generated yet.</p>
        );
      case "behaviouralQuestions":
        return report.behaviouralQuestions.length ? (
          <ul className="section-list">
            {report.behaviouralQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No behavioral questions have been generated yet.</p>
        );
      default:
        return (
          <div className="timeline-list">
            {roadmapItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span>{item.day}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <ul>
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="interview-page">
      <aside className="interview-sidebar">
        <div className="sidebar-title">Sections</div>
        <nav className="sidebar-nav">
          {sections.map((section) => {
            const selected = activeSection === section.key;
            return (
              <button
                key={section.key}
                type="button"
                className={`sidebar-link ${selected ? "active" : ""}`}
                onClick={() => setActiveSection(section.key)}
              >
                <span className="sidebar-icon">■</span>
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="interview-main">
        <div className="main-toolbar">
          <div>
            <p className="eyebrow">Preparation Road Map</p>
            <h2>7-day plan</h2>
          </div>
          <div className="status-pill">Recommended</div>
        </div>

        <div className="main-summary">
          <article className="summary-card">
            <div className="card-label">Job Description</div>
            <p>{report.jobDescription}</p>
          </article>
          <article className="summary-card card-secondary">
            <div className="card-label">Profile Overview</div>
            <p>{report.selfDescription}</p>
          </article>
        </div>

        <section className="section-panel">
          <div className="section-panel-header">
            <div>
              <h3>{sections.find((item) => item.key === activeSection)?.label}</h3>
              <p className="section-subtitle">
                {activeSection === "technicalQuestions" && "Key interview topics to prepare."}
                {activeSection === "behaviouralQuestions" && "Behavioral prompts to practice with."}
                {activeSection === "preprationPlans" && "A focused study plan for the next week."}
              </p>
            </div>
            <span className="item-count">
              {activeSection === "technicalQuestions" && report.technicalQuestions.length}
              {activeSection === "behaviouralQuestions" && report.behaviouralQuestions.length}
              {activeSection === "preprationPlans" && report.preprationPlans.length}
            </span>
          </div>
          {renderSectionContent()}
        </section>
      </main>

      <aside className="interview-right">
        <div className="match-card">
          <div className="match-score-ring">
            <span>{matchScore}%</span>
          </div>
          <div className="match-copy">
            <p>Match Score</p>
            <strong>Strong match for this role</strong>
          </div>
        </div>

        <div className="pie-chart-block">
          <div className="pie-chart" style={{ background: `conic-gradient(#ff1b6d 0% ${piePercent}%, rgba(255, 27, 109, 0.14) ${piePercent}% 100%)` }}>
            <div className="pie-center">
              <strong>{piePercent}%</strong>
              <span>Prepared</span>
            </div>
          </div>
          <div className="pie-copy">
            <h4>Interview Readiness</h4>
            <p>Visual readiness score based on current skill gaps and study plan coverage.</p>
          </div>
        </div>

        <div className="right-panel-block">
          <div className="panel-header">
            <h3>Skill Gaps</h3>
            <p>Improve these topics before your next interview.</p>
          </div>
          <div className="chip-list">
            {report.skillGaps.length ? (
              report.skillGaps.map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                </span>
              ))
            ) : (
              <p className="empty-state">No skill gaps detected.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Interview;
