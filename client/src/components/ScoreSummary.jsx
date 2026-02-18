function ScoreSummary({ integrityScore, timeTaken, totalQuestions, quizScore, questions, selectedAnswers, onRestart }) {

  const getGrade = () => {
    const combined = Math.round((quizScore / totalQuestions) * 100 * 0.6 + integrityScore * 0.4)
    if (combined >= 90) return { grade: 'A', label: 'Excellent!', color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
    if (combined >= 75) return { grade: 'B', label: 'Good Job!', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' }
    if (combined >= 50) return { grade: 'C', label: 'Needs Improvement', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' }
    return { grade: 'F', label: 'Keep Practicing!', color: 'text-red-600', bg: 'bg-red-50 border-red-200' }
  }

  const formatTime = (seconds) => {
    const totalSeconds = 30 * 60 - seconds
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const { grade, label, color, bg } = getGrade()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            📊 Interview Summary
          </h1>
          <p className="text-gray-500 text-sm">Here's how you performed!</p>
        </div>

        {/* Grade */}
        <div className={`rounded-2xl border p-6 mb-4 text-center ${bg}`}>
          <p className="text-sm font-semibold text-gray-500 mb-1">Final Grade</p>
          <p className={`text-8xl font-bold ${color}`}>{grade}</p>
          <p className={`text-lg font-semibold mt-2 ${color}`}>{label}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1">🎯 Quiz Score</p>
            <p className="text-3xl font-bold text-blue-600">
              {quizScore}
              <span className="text-sm text-gray-400 font-normal">/{totalQuestions}</span>
            </p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${(quizScore / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1">👁️ Integrity Score</p>
            <p className={`text-3xl font-bold ${
              integrityScore >= 80 ? 'text-green-600' : integrityScore >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {integrityScore}
              <span className="text-sm text-gray-400 font-normal">/100</span>
            </p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full ${integrityScore >= 80 ? 'bg-green-500' : integrityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${integrityScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1">⏱️ Time Used</p>
            <p className="text-3xl font-bold text-indigo-600 font-mono">
              {formatTime(timeTaken)}
            </p>
            <p className="text-xs text-gray-400 mt-2">out of 30:00</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1">⚠️ Points Lost</p>
            <p className="text-3xl font-bold text-red-500">
              {100 - integrityScore}
            </p>
            <p className="text-xs text-gray-400 mt-2">from violations</p>
          </div>

        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm mb-6">
          <p className="text-sm font-bold text-gray-700 mb-4">📋 Answer Review</p>
          <div className="flex flex-col gap-4">
            {questions.map((q, i) => {
              const selected = selectedAnswers[i]
              const isCorrect = selected === q.correct
              const isUnanswered = selected === undefined
              return (
                <div
                  key={i}
                  className={`rounded-lg p-4 border ${
                    isUnanswered
                      ? 'bg-gray-50 border-gray-200'
                      : isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full shrink-0">
                      Q{i + 1}
                    </span>
                    <p className="text-xs font-semibold text-gray-700">
                      {q.question}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 ml-8">
                    {q.options.map((opt, oIndex) => (
                      <p
                        key={oIndex}
                        className={`text-xs px-3 py-1.5 rounded-lg ${
                          oIndex === q.correct
                            ? 'bg-green-200 text-green-800 font-bold'
                            : oIndex === selected && !isCorrect
                            ? 'bg-red-200 text-red-800 font-semibold line-through'
                            : 'text-gray-500'
                        }`}
                      >
                        <span className="font-bold mr-1">{['A', 'B', 'C', 'D'][oIndex]}.</span>
                        {opt}
                        {oIndex === q.correct && ' ✅'}
                        {oIndex === selected && !isCorrect && ' ❌'}
                      </p>
                    ))}
                  </div>
                  {isUnanswered && (
                    <p className="text-xs text-gray-400 mt-1 ml-8">⚪ Not answered</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 w-full"
          >
            🚀 Start New Interview
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 px-6 rounded-xl transition duration-200 w-full"
          >
            🖨️ Print Summary
          </button>
        </div>

      </div>
    </div>
  )
}

export default ScoreSummary