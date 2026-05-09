import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'

type ViewMode = 'split' | 'toggle'
type ToggleMode = 'normal' | 'dog'
type MediaKind = 'image' | 'video'

interface MediaSelection {
  source: string
  kind: MediaKind
  objectUrl: boolean
}

const SAMPLE_IMAGES: Array<{ label: string; source: string }> = [
  { label: 'Outdoors', source: '/samples/outdoors.svg' },
  { label: 'Agility Course', source: '/samples/agility-course.svg' },
]

function isProbablyMobile() {
  const navWithUserAgentData = navigator as Navigator & {
    userAgentData?: { mobile?: boolean }
  }
  const maybeMobile =
    navWithUserAgentData.userAgentData?.mobile ??
    /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)
  return Boolean(maybeMobile)
}

export function Simulator() {
  const [selection, setSelection] = useState<MediaSelection | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [toggleMode, setToggleMode] = useState<ToggleMode>('normal')
  const [liveMode, setLiveMode] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [mobileSupport] = useState(isProbablyMobile)

  const normalLiveRef = useRef<HTMLVideoElement>(null)
  const dogLiveRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const hasMedia = Boolean(selection)
  const showNormal = viewMode === 'split' || toggleMode === 'normal'
  const showDog = viewMode === 'split' || toggleMode === 'dog'

  const mediaElements = useMemo(() => {
    if (!selection) {
      return null
    }

    if (selection.kind === 'image') {
      return {
        normal: <img src={selection.source} alt="Original upload" className="preview-media" />,
        dog: (
          <img
            src={selection.source}
            alt="Dog-vision simulation"
            className="preview-media dog-filtered"
          />
        ),
      }
    }

    return {
      normal: <video src={selection.source} className="preview-media" controls playsInline />,
      dog: (
        <video
          src={selection.source}
          className="preview-media dog-filtered"
          controls
          playsInline
        />
      ),
    }
  }, [selection])

  const stopLiveMode = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setLiveMode(false)
  }

  const startLiveMode = async () => {
    setCameraError('')
    try {
      stopLiveMode()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })

      streamRef.current = stream
      if (normalLiveRef.current) {
        normalLiveRef.current.srcObject = stream
      }
      if (dogLiveRef.current) {
        dogLiveRef.current.srcObject = stream
      }
      setLiveMode(true)
    } catch {
      setCameraError('Unable to start camera preview. Check camera permissions and try again.')
      setLiveMode(false)
    }
  }

  const selectMedia = (nextSelection: MediaSelection) => {
    stopLiveMode()
    if (selection?.objectUrl) {
      URL.revokeObjectURL(selection.source)
    }
    setSelection(nextSelection)
    setCameraError('')
  }

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const kind: MediaKind = file.type.startsWith('video/') ? 'video' : 'image'
    selectMedia({ source: URL.createObjectURL(file), kind, objectUrl: true })
    event.target.value = ''
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (selection?.objectUrl) {
        URL.revokeObjectURL(selection.source)
      }
    }
  }, [selection])

  return (
    <section className="panel simulator-panel" aria-labelledby="simulator-title">
      <h2 id="simulator-title">Simulator</h2>
      <p className="helper-text">Upload media, pick a sample, or use live camera on mobile.</p>

      <div className="control-grid">
        <label className="field">
          <span>Upload image or video</span>
          <input type="file" accept="image/*,video/*" onChange={onFileInput} />
        </label>

        <div className="field">
          <span>Sample images</span>
          <div className="sample-buttons">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.source}
                type="button"
                className="ghost-button"
                onClick={() =>
                  selectMedia({
                    source: sample.source,
                    kind: 'image',
                    objectUrl: false,
                  })
                }
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {mobileSupport && (
          <div className="field">
            <span>Mobile live preview</span>
            <button type="button" className="primary-button" onClick={startLiveMode}>
              Start live camera
            </button>
          </div>
        )}
      </div>

      <fieldset className="view-controls">
        <legend>Preview mode</legend>
        <label>
          <input
            type="radio"
            name="view-mode"
            value="split"
            checked={viewMode === 'split'}
            onChange={() => setViewMode('split')}
          />
          Side-by-side
        </label>
        <label>
          <input
            type="radio"
            name="view-mode"
            value="toggle"
            checked={viewMode === 'toggle'}
            onChange={() => setViewMode('toggle')}
          />
          Toggle
        </label>
      </fieldset>

      {viewMode === 'toggle' && (
        <div className="toggle-controls" role="group" aria-label="Toggle output">
          <button
            type="button"
            className="ghost-button"
            aria-pressed={toggleMode === 'normal'}
            onClick={() => setToggleMode('normal')}
          >
            Normal
          </button>
          <button
            type="button"
            className="ghost-button"
            aria-pressed={toggleMode === 'dog'}
            onClick={() => setToggleMode('dog')}
          >
            Dog Vision
          </button>
        </div>
      )}

      {!liveMode && hasMedia && mediaElements && (
        <div className="preview-grid">
          {showNormal && (
            <figure className="preview-card">
              <figcaption>Normal</figcaption>
              {mediaElements.normal}
            </figure>
          )}
          {showDog && (
            <figure className="preview-card">
              <figcaption>Dog Vision</figcaption>
              {mediaElements.dog}
            </figure>
          )}
        </div>
      )}

      {liveMode && (
        <div className="preview-grid">
          {showNormal && (
            <figure className="preview-card">
              <figcaption>Normal</figcaption>
              <video ref={normalLiveRef} autoPlay muted playsInline className="preview-media" />
            </figure>
          )}
          {showDog && (
            <figure className="preview-card">
              <figcaption>Dog Vision</figcaption>
              <video
                ref={dogLiveRef}
                autoPlay
                muted
                playsInline
                className="preview-media dog-filtered"
              />
            </figure>
          )}
          <div className="live-actions">
            <button type="button" className="ghost-button" onClick={stopLiveMode}>
              Stop camera
            </button>
          </div>
        </div>
      )}

      {cameraError && <p className="error-text">{cameraError}</p>}
    </section>
  )
}
