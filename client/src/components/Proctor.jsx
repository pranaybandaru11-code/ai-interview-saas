import { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

function Proctor({ onScoreUpdate }) {
  const videoRef = useRef(null)
  const [score, setScore] = useState(100)
  const [status, setStatus] = useState('Starting camera...')
  const [statusColor, setStatusColor] = useState('text-gray-500')
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const scoreRef = useRef(100)

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setStatus('Loading face detection models...')
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        setModelsLoaded(true)
        setStatus('Models loaded! Starting camera...')
      } catch (err) {
        setStatus('Failed to load models!')
        console.error(err)
      }
    }
    loadModels()
  }, [])

  // Start camera after models load
  useEffect(() => {
    if (!modelsLoaded) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraReady(true)
          setStatus('✅ Camera ready! You are being monitored.')
          setStatusColor('text-green-600')
        }
      } catch (err) {
        setStatus('❌ Camera access denied!')
        setStatusColor('text-red-600')
      }
    }
    startCamera()
  }, [modelsLoaded])

  // Start face detection after camera is ready
  useEffect(() => {
    if (!cameraReady) return

    const interval = setInterval(async () => {
      if (!videoRef.current) return

      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()

      let newScore = scoreRef.current
      let newStatus = ''
      let newColor = ''

      if (detections.length === 0) {
        // No face detected
        newScore = Math.max(0, newScore - 10)
        newStatus = '❌ No face detected! -10 points'
        newColor = 'text-red-600'
      } else if (detections.length > 1) {
        // Multiple faces
        newScore = Math.max(0, newScore - 15)
        newStatus = '🚨 Multiple faces detected! -15 points'
        newColor = 'text-red-600'
      } else {
        // One face detected — check if looking at screen
        const landmarks = detections[0].landmarks
        const nose = landmarks.getNose()
        const leftEye = landmarks.getLeftEye()
        const rightEye = landmarks.getRightEye()

        const eyeCenterX = (leftEye[0].x + rightEye[3].x) / 2
        const noseTipX = nose[3].x
        const deviation = Math.abs(eyeCenterX - noseTipX)

        if (deviation > 40) {
          // Looking away
          newScore = Math.max(0, newScore - 5)
          newStatus = '⚠️ Please look at the screen! -5 points'
          newColor = 'text-yellow-600'
        } else {
          newStatus = '✅ Good! You are being monitored.'
          newColor = 'text-green-600'
        }
      }

      scoreRef.current = newScore
      setScore(newScore)
      setStatus(newStatus)
      setStatusColor(newColor)
      onScoreUpdate(newScore)

    }, 2000)

    // Detect tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newScore = Math.max(0, scoreRef.current - 10)
        scoreRef.current = newScore
        setScore(newScore)
        setStatus('🔄 Tab switch detected! -10 points')
        setStatusColor('text-red-600')
        onScoreUpdate(newScore)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [cameraReady])

  // Score color
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = () => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 50) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className={`rounded-xl border p-4 mb-6 ${getScoreBg()}`}>
      <div className="flex items-center justify-between mb-3">

        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-lg">👁️</span>
          <span className="font-bold text-gray-700 text-sm">
            AI Proctor
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Integrity Score:</span>
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            {score}
          </span>
          <span className="text-gray-400 text-sm">/100</span>
        </div>

      </div>

      {/* Score bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            score >= 80
              ? 'bg-green-500'
              : score >= 50
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="flex items-center gap-3">
        {/* Camera feed */}
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-20 h-16 rounded-lg object-cover border-2 border-gray-200"
        />

        {/* Status */}
        <p className={`text-xs font-medium ${statusColor}`}>
          {status}
        </p>
      </div>

    </div>
  )
}

export default Proctor