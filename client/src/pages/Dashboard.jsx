import { useState, useEffect, useRef } from 'react'
import Proctor from '../components/Proctor'
import ScoreSummary from '../components/ScoreSummary'

function Dashboard({ questions, loading, error, setSubmitted }) {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [integrityScore, setIntegrityScore] = useState(100)
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [timerStarted, setTimerStarted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (questions.length > 0 && !loading && !timerStarted) {
      setTimerStarted(true)
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setShowSummary(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [questions, loading])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const getTimerColor = () => {
    if (timeLeft <= 5 * 60) return 'text-red-600'
    if (timeLeft <= 10 * 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getTimerBg = () => {
    if (timeLeft <= 5 * 60) return 'bg-red-50 border-red-200'
    if (timeLeft <= 10 * 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-green-50 border-green-200'
  }

  const handleSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    clearInterval(timerRef.current)
    setShowSummary(true)
  }

  const handleRestart = () => {
    clearInterval(timerRef.current)
    setSubmitted(false)
  }

  const calculateQuizScore = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) correct++
    })
    return correct
  }

  if (showSummary) {
    return (
      <ScoreSummary
        integrityScore={integrityScore}
        timeTaken={timeLeft}
        totalQuestions={questions.length}
        quizScore={calculateQuizScore()}
        questions={questions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            🎯 Mock Interview Test
          </h1>
          <p className="text-gray-500 text-sm">
            Select one answer for each question then submit!
          </p>
        </div>

        {/* Timer */}
        {!loading && !error && questions.length > 0 && (
          <div className={`rounded-xl border p-4 mb-4 flex items-center justify-between ${getTimerBg()}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="font-bold text-gray-700 text-sm">Interview Timer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold font-mono ${getTimerColor()}`}>
                {formatTime(timeLeft)}
              </span>
              {timeLeft <= 5 * 60 && (
                <span className="text-red-500 text-xs font-semibold animate-pulse">Hurry up!</span>
              )}
              {timeLeft <= 10 * 60 && timeLeft > 5 * 60 && (
                <span className="text-yellow-500 text-xs font-semibold">Running low!</span>
              )}
            </div>
          </div>
        )}

        {/* Proctor */}
        {!loading && !error && questions.length > 0 && (
          <Proctor onScoreUpdate={(s) => setIntegrityScore(s)} />
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm">AI is generating your questions...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-6">
            <p className="text-red-600 font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Questions */}
        {!loading && !error && questions.length > 0 && (
          <div className="flex flex-col gap-6">

            <div className="flex justify-center mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                {questions.length} Questions • Select your answers ✨
              </span>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              >
                {/* Question */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 font-bold text-sm px-3 py-1 rounded-full shrink-0">
                    Q{qIndex + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {q.question}
                  </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {q.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(qIndex, oIndex)}
                      className={`text-left px-4 py-3 rounded-lg text-sm border transition duration-200 ${
                        selectedAnswers[qIndex] === oIndex
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                      }`}
                    >
                      <span className="font-bold mr-2">
                        {['A', 'B', 'C', 'D'][oIndex]}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

              </div>
            ))}

            {/* Progress */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-sm text-gray-500">
                Answered{' '}
                <span className="font-bold text-blue-600">
                  {Object.keys(selectedAnswers).length}
                </span>
                {' '}of{' '}
                <span className="font-bold text-blue-600">
                  {questions.length}
                </span>
                {' '}questions
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 w-full text-lg"
            >
              📊 Submit Interview
            </button>

            <button
              onClick={handleRestart}
              className="bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition duration-200 w-full text-sm"
            >
              ← Start Over
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard