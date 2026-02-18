import { useState } from 'react'
import axios from 'axios'

function QuestionForm({ setQuestions, setLoading, setError, setSubmitted }) {
  const [jobRole, setJobRole] = useState('')
  const [experience, setExperience] = useState('')
  const [techStack, setTechStack] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!jobRole || !experience || !techStack) {
      setError('Please fill in all fields!')
      setSubmitted(true)
      return
    }

    try {
      setLoading(true)
      setError('')
      setSubmitted(true)

      const response = await axios.post('http://localhost:5000/api/generate', {
        jobRole,
        experience,
        techStack,
      })

      setQuestions(response.data.questions)
    } catch (err) {
      setError('Something went wrong. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

      {/* Job Role Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Job Role
        </label>
        <input
          type="text"
          placeholder="e.g. Frontend Developer"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Experience Level */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Experience Level
        </label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner (0–1 years)</option>
          <option value="Intermediate">Intermediate (1–3 years)</option>
          <option value="Advanced">Advanced (3+ years)</option>
        </select>
      </div>

      {/* Tech Stack Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Tech Stack
        </label>
        <input
          type="text"
          placeholder="e.g. React, Node.js, MongoDB"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 mt-2"
      >
        Generate Questions 🚀
      </button>

    </form>
  )
}

export default QuestionForm