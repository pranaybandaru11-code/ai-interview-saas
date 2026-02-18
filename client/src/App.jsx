import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {!submitted ? (
        <Home
          setQuestions={setQuestions}
          setLoading={setLoading}
          setError={setError}
          setSubmitted={setSubmitted}
          loading={loading}
        />
      ) : (
        <Dashboard
          questions={questions}
          loading={loading}
          error={error}
          setSubmitted={setSubmitted}
        />
      )}
    </div>
  )
}

export default App