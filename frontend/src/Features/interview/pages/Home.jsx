import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const { user, handleLogout } = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFileName, setResumeFileName ] = useState("")
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleNewPlan = () => {
        setJobDescription("")
        setSelfDescription("")
        setResumeFileName("")
        if (resumeInputRef.current) {
            resumeInputRef.current.value = ""
        }
        setIsSidebarOpen(false)
    }

    const handleUserLogout = async () => {
        await handleLogout()
        navigate("/login")
    }

    const handleOpenReport = (reportId) => {
        setIsSidebarOpen(false)
        navigate(`/interview/${reportId}`)
    }

    const profileInitial = user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className={`home-page ${isSidebarOpen ? "home-page--sidebar-open" : ""}`}>
            <button
                className='sidebar-overlay'
                type='button'
                aria-label='Close sidebar'
                onClick={() => setIsSidebarOpen(false)}
            />

            <aside className={`plans-sidebar ${isSidebarOpen ? "plans-sidebar--open" : ""}`}>
                <div className='sidebar-brand'>
                    <div>
                        <p className='brand-mark'>InterviewIQ</p>
                        <span>Preparation workspace</span>
                    </div>
                    <button className='sidebar-close-btn' type='button' aria-label='Close sidebar' onClick={() => setIsSidebarOpen(false)}>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <button className='sidebar-new-plan' type='button' onClick={handleNewPlan}>
                    <span>+</span>
                    New interview plan
                </button>

                <div className='sidebar-section'>
                    <p className='sidebar-section__label'>Recent plans</p>
                    {reports.length > 0 ? (
                        <ul className='reports-list'>
                            {reports.map(report => (
                                <li key={report._id}>
                                    <button className='report-item' type='button' onClick={() => handleOpenReport(report._id)}>
                                        <span className='report-item__title'>{report.title || 'Untitled Position'}</span>
                                        <span className='report-item__meta'>
                                            {new Date(report.createdAt).toLocaleDateString()} - {report.matchScore}% match
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='empty-plans'>Your generated interview plans will appear here.</p>
                    )}
                </div>

                <section className='profile-card' aria-label='My profile'>
                    <div className='profile-card__header'>
                        <span className='profile-avatar'>{profileInitial}</span>
                        <div>
                            <p>{user?.username || "User"}</p>
                            <span>{user?.email || "No email found"}</span>
                        </div>
                    </div>
                    <button className='logout-btn' type='button' onClick={handleUserLogout}>
                        Logout
                    </button>
                </section>

                <footer className='sidebar-footer'>
                    <a href='#'>Privacy</a>
                    <a href='#'>Terms</a>
                    <a href='#'>Help</a>
                </footer>
            </aside>

            <main className='home-main'>
                <div className='mobile-topbar'>
                    <button
                        className='hamburger-btn'
                        type='button'
                        aria-label='Open sidebar'
                        aria-expanded={isSidebarOpen}
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div>
                        <p className='brand-mark'>InterviewIQ</p>
                        <span>Preparation workspace</span>
                    </div>
                </div>

                {/* Page Header */}
                <header className='page-header'>
                    <div>
                        <p className='page-kicker'>Role focused preparation</p>
                        <h1>Create a clear <span className='highlight'>interview plan</span></h1>
                    </div>
                    <p>Paste the role, add your profile, and get a focused plan you can actually use before the interview.</p>
                </header>

                {/* Main Card */}
                <div className='interview-card'>
                    <div className='card-intro'>
                        <div>
                            <span className='step-pill'>01</span>
                            <h2>Start with the role</h2>
                        </div>
                        <p>Keep the inputs practical. A complete job post and either a resume or short profile is enough.</p>
                    </div>
                    <div className='interview-card__body'>

                        {/* Left Panel - Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='panel__textarea'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* Vertical Divider */}
                        <div className='panel-divider' />

                        {/* Right Panel - Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Profile</h2>
                            </div>

                            {/* Upload Resume */}
                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className='dropzone__title'>{resumeFileName || "Click to upload resume"}</p>
                                    <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    <input
                                        ref={resumeInputRef}
                                        hidden
                                        type='file'
                                        id='resume'
                                        name='resume'
                                        accept='.pdf,.docx'
                                        onChange={(e) => { setResumeFileName(e.target.files?.[0]?.name || "") }}
                                    />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className='or-divider'><span>OR</span></div>

                            {/* Quick Self-Description */}
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info Box */}
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                                </span>
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>Strategy generation takes about 30 seconds</span>
                        <button
                            onClick={handleGenerateReport}
                            className='generate-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
