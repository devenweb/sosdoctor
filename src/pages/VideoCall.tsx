import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Settings,
  MessageSquare
} from 'lucide-react'
import Peer from 'simple-peer'
import io from 'socket.io-client'

export function VideoCall() {
  const { appointmentId } = useParams()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState('')
  const [callerSignal, setCallerSignal] = useState<any>()
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: string}>>([])
  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(false)

  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<any>()
  const socket = useRef<any>()

  useEffect(() => {
    // Initialize socket connection
    socket.current = io('ws://localhost:3001')
    
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error)
      })

    socket.current.on('me', (id: string) => {
      setName(id)
    })

    socket.current.on('callUser', (data: any) => {
      setReceivingCall(true)
      setCaller(data.from)
      setCallerSignal(data.signal)
    })

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      socket.current.disconnect()
    }
  }, [])

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream!
    })

    peer.on('signal', (data) => {
      socket.current.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: name,
        name: name
      })
    })

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    socket.current.on('callAccepted', (signal: any) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!
    })

    peer.on('signal', (data) => {
      socket.current.emit('answerCall', { signal: data, to: caller })
    })

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
    window.close()
  }

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setAudioEnabled(audioTrack.enabled)
      }
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me'
      }
      setMessages(prev => [...prev, message])
      socket.current.emit('sendMessage', { message: newMessage, to: caller })
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">
          Video Consultation - Appointment #{appointmentId}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm">● Connected</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {callAccepted && !callEnded ? (
              <video
                ref={userVideo}
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12" />
                </div>
                <p>Waiting for doctor to join...</p>
              </div>
            )}
          </div>

          {/* Local Video (Picture in Picture) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
            <video
              ref={myVideo}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-800 bg-opacity-75 rounded-full px-6 py-3">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                videoEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
              } text-white transition-colors`}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                audioEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
              } text-white transition-colors`}
            >
              {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
            </button>

            <button
              onClick={leaveCall}
              className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Incoming Call Modal */}
      {receivingCall && !callAccepted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Incoming Call</h3>
            <p className="text-gray-600 mb-6">Doctor is calling...</p>
            <div className="flex space-x-4">
              <button
                onClick={answerCall}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Answer</span>
              </button>
              <button
                onClick={() => setReceivingCall(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <PhoneOff className="h-4 w-4" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}