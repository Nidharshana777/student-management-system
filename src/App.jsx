import { useState, useEffect } from 'react'
import './App.css'

// Header Component
function Header() {
  return (
    <header>
      <h1>Student Management System</h1>
    </header>
  )
}

// StudentProfile Component
function StudentProfile({ name, department, year, practiceCount }) {

  useEffect(() => {
    // Save the current document title
    const previousTitle = document.title

    // Update title when practice count changes
    document.title = `Practice Sessions: ${practiceCount}`

    // Cleanup function
    return () => {
      document.title = previousTitle
    }
  }, [practiceCount])

  return (
    <div className="student-profile">
      <p><strong>Name:</strong> {name}</p>

      <p><strong>Department:</strong> {department}</p>

      <p><strong>Year:</strong> {year}</p>

      <p>
        <strong>Practice Sessions Completed:</strong> {practiceCount}
      </p>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer>
      <p>© 2026 Student Management System</p>
    </footer>
  )
}

// Main App Component
function App() {

  // State for completed practice sessions
  const [practiceCount, setPracticeCount] = useState(0)

  // State for showing/hiding the profile
  const [showProfile, setShowProfile] = useState(true)

  return (
    <div className="app">

      <Header />

      <main>

        <button onClick={() => setPracticeCount(practiceCount + 1)}>
          Complete Practice
        </button>

        <button onClick={() => setPracticeCount(0)}>
          Reset
        </button>

        <button onClick={() => setShowProfile(!showProfile)}>
          {showProfile ? 'Hide Profile' : 'Show Profile'}
        </button>

        {showProfile && (
          <StudentProfile
            name="Anu"
            department="CSE"
            year="3rd Year"
            practiceCount={practiceCount}
          />
        )}

      </main>

      <Footer />

    </div>
  )
}

export default App