"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import gsap from "gsap"

export interface TypingHandle {
  play: (onComplete?: () => void) => void
  reset: () => void
}

interface Props {
  text: string
  className?: string
  charDelay?: number  // seconds between characters
  showCursor?: boolean
}

// Renders text as individual character spans that snap in one-by-one.
// Call play() to start, reset() to hide all characters.
const TypingText = forwardRef<TypingHandle, Props>(
  ({ text, className, charDelay = 0.045, showCursor = true }, ref) => {
    const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
    const cursorRef = useRef<HTMLSpanElement>(null)

    useImperativeHandle(ref, () => ({
      play(onComplete) {
        const spans = spanRefs.current.filter((s): s is HTMLSpanElement => !!s)
        gsap.killTweensOf(spans)
        gsap.set(spans, { opacity: 0 })
        if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 1 })

        gsap.to(spans, {
          opacity: 1,
          duration: 0,
          stagger: charDelay,
          ease: "none",
          onComplete: () => {
            if (cursorRef.current) {
              gsap.to(cursorRef.current, { opacity: 0, delay: 1.5, duration: 0.3 })
            }
            onComplete?.()
          },
        })
      },

      reset() {
        const spans = spanRefs.current.filter((s): s is HTMLSpanElement => !!s)
        gsap.killTweensOf(spans)
        gsap.set(spans, { opacity: 0 })
        if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 0 })
      },
    }))

    return (
      <span className={className}>
        {[...text].map((char, i) => (
          <span
            key={i}
            ref={el => { spanRefs.current[i] = el }}
            style={{ opacity: 0 }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
        {showCursor && (
          <span ref={cursorRef} className="cursor-blink" style={{ opacity: 0 }} />
        )}
      </span>
    )
  }
)

TypingText.displayName = "TypingText"
export default TypingText
