"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TypingText, { TypingHandle } from "../components/TypingText"

gsap.registerPlugin(ScrollTrigger)

// ── Swap this for your YouTube embed URL when ready ──────────────────────────
// e.g. "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0"
const VIDEO_URL = ""

const Scanlines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-[2]"
    style={{
      background:
        "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",
    }}
  />
)

export default function Page() {
  const mainRef         = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  // Dark scene containers
  const s1Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)
  const s4Ref = useRef<HTMLDivElement>(null)
  const s5Ref = useRef<HTMLDivElement>(null)
  const s6Ref = useRef<HTMLDivElement>(null)
  const s7Ref = useRef<HTMLDivElement>(null)
  const s8Ref = useRef<HTMLDivElement>(null)

  // Typing handles
  const t1Ref  = useRef<TypingHandle>(null)
  const t2aRef = useRef<TypingHandle>(null)
  const t2bRef = useRef<TypingHandle>(null)
  const t3Ref  = useRef<TypingHandle>(null)
  const t4aRef = useRef<TypingHandle>(null)
  const t4bRef = useRef<TypingHandle>(null)
  const weirdRef = useRef<HTMLSpanElement>(null)
  const t5aRef = useRef<TypingHandle>(null)
  const t5bRef = useRef<TypingHandle>(null)
  const t5cRef = useRef<TypingHandle>(null)
  const t6aRef = useRef<TypingHandle>(null)
  const t6bRef = useRef<TypingHandle>(null)
  const t7Ref  = useRef<TypingHandle>(null)
  const t8Ref  = useRef<TypingHandle>(null)

  // Final scene glitch
  const s8TagRef   = useRef<HTMLParagraphElement>(null)
  const s8TearRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const TEXT_TEARS: [number, number][] = [
    [0, 80], [15, 60], [35, 40], [57, 20], [78, 0],
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── ACT 1+2: wipe animation over the video section ───────────
      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })
      // wipe fires in the last 25% of the video section
      videoTl.to(videoWrapperRef.current, {
        clipPath: "inset(0 100% 0 0)",
        skewX: 2,
        ease: "power3.inOut",
        duration: 0.25,
      }, 0.75)

      // ── ACT 3: typing triggers per scene ─────────────────────────
      // Each scene is h-screen; typing fires when the scene enters the viewport.
      // start: "top 65%" means typing fires when scene top crosses 65% down from top.

      function sceneTyping(
        ref: React.RefObject<HTMLDivElement | null>,
        onEnterFn: () => void,
        onLeaveFn: () => void,
      ) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 65%",
          onEnter: onEnterFn,
          onLeaveBack: onLeaveFn,
        })
      }

      sceneTyping(s1Ref,
        () => t1Ref.current?.play(),
        () => t1Ref.current?.reset(),
      )

      sceneTyping(s2Ref,
        () => {
          t2aRef.current?.play()
          setTimeout(() => t2bRef.current?.play(), 700)
        },
        () => { t2aRef.current?.reset(); t2bRef.current?.reset() },
      )

      sceneTyping(s3Ref,
        () => t3Ref.current?.play(),
        () => t3Ref.current?.reset(),
      )

      sceneTyping(s4Ref,
        () => {
          if (weirdRef.current) gsap.set(weirdRef.current, { opacity: 0 })
          t4aRef.current?.play(() => {
            if (weirdRef.current) gsap.to(weirdRef.current, { opacity: 1, duration: 0.1 })
            setTimeout(() => t4bRef.current?.play(), 150)
          })
        },
        () => {
          t4aRef.current?.reset()
          t4bRef.current?.reset()
          if (weirdRef.current) gsap.set(weirdRef.current, { opacity: 0 })
        },
      )

      sceneTyping(s5Ref,
        () => {
          t5aRef.current?.play()
          setTimeout(() => t5bRef.current?.play(), 600)
          setTimeout(() => t5cRef.current?.play(), 1100)
        },
        () => { t5aRef.current?.reset(); t5bRef.current?.reset(); t5cRef.current?.reset() },
      )

      sceneTyping(s6Ref,
        () => {
          t6aRef.current?.play(() => {
            setTimeout(() => t6bRef.current?.play(), 200)
          })
        },
        () => { t6aRef.current?.reset(); t6bRef.current?.reset() },
      )

      sceneTyping(s7Ref,
        () => t7Ref.current?.play(),
        () => t7Ref.current?.reset(),
      )

      sceneTyping(s8Ref,
        () => t8Ref.current?.play(),
        () => t8Ref.current?.reset(),
      )

      // ── LOOPING SCREEN-TEAR GLITCH on final scene ────────────────
      const tears = s8TearRefs.current
      const tearColors = [
        "hue-rotate(200deg) saturate(10)",
        "invert(1)",
        "hue-rotate(90deg) saturate(8)",
        "invert(0.8) hue-rotate(300deg)",
        "hue-rotate(150deg) saturate(6)",
      ]
      const tearOffsets1 = [-52, 38, -64, 30, -44]
      const tearOffsets2 = [42, -55, 28, -48, 60]

      const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 2.5, paused: true })

      tears.forEach((t, i) => {
        loopTl.to(t, { x: tearOffsets1[i], opacity: 1, filter: tearColors[i], duration: 0.04 }, i === 0 ? ">" : "<")
      })
      loopTl.to(s8TagRef.current, { opacity: 0, duration: 0.03 }, "<")

      tears.forEach((t, i) => {
        loopTl.to(t, { x: tearOffsets2[i], duration: 0.04 }, i === 0 ? "+=0.06" : "<")
      })

      loopTl
        .to(tears, { x: 0, opacity: 0, filter: "none", duration: 0.05 }, "+=0.04")
        .to(s8TagRef.current, { opacity: 0.3, duration: 0.03 }, "<")
        .to(s8TagRef.current, { opacity: 0,   duration: 0.02 })
        .to(s8TagRef.current, { opacity: 1,   duration: 0.05 })

      loopTl
        .to(tears[1], { x: -30, opacity: 1, filter: tearColors[1], duration: 0.03 }, "+=0.5")
        .to(tears[3], { x: 24,  opacity: 1, filter: tearColors[3], duration: 0.03 }, "<")
        .to(s8TagRef.current, { opacity: 0, duration: 0.03 }, "<")
        .to(tears[1], { x: 0, opacity: 0, filter: "none", duration: 0.04 }, "+=0.05")
        .to(tears[3], { x: 0, opacity: 0, filter: "none", duration: 0.04 }, "<")
        .to(s8TagRef.current, { opacity: 1, duration: 0.04 })

      ScrollTrigger.create({
        trigger: s8Ref.current,
        start: "top center",
        onEnter: () => loopTl.play(),
        onLeaveBack: () => loopTl.pause(0),
      })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef}>

      {/* ── ACT 1+2: Sticky video section — 300vh total ─────────────── */}
      <div ref={videoContainerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]" />
          <Scanlines />

          <div ref={videoWrapperRef} className="absolute inset-0 z-20 bg-black">
            {VIDEO_URL ? (
              <iframe
                src={VIDEO_URL}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-gray-600 flex items-center justify-center">
                  <div className="w-0 h-0 ml-1" style={{
                    borderTop: "14px solid transparent",
                    borderBottom: "14px solid transparent",
                    borderLeft: "24px solid #4b5563",
                  }} />
                </div>
                <p className="text-gray-600 tracking-widest text-sm font-mono">[ PASTE VIDEO_URL IN page.tsx ]</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ACT 3: Dark text scenes — each is h-screen ──────────────── */}

      <div ref={s1Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <TypingText
          ref={t1Ref}
          text="WE ARE POSTHOG."
          className="relative z-10 font-terminal text-7xl md:text-9xl tracking-widest text-white text-center px-8"
        />
      </div>

      <div ref={s2Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 overflow-hidden">
        <Scanlines />
        <TypingText
          ref={t2aRef}
          text="WE DO NOT FORGIVE BORING."
          className="relative z-10 font-terminal text-4xl md:text-6xl tracking-widest text-[#00ff41] text-center px-8"
          showCursor={false}
        />
        <TypingText
          ref={t2bRef}
          text="WE DO NOT FORGET."
          className="relative z-10 font-terminal text-4xl md:text-6xl tracking-widest text-[#00ff41] text-center px-8"
          charDelay={0.055}
        />
      </div>

      <div ref={s3Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <p className="relative z-10 font-terminal text-6xl md:text-8xl tracking-wide text-white text-center px-8">
          <TypingText
            ref={t3Ref}
            text="And yet we're dropping the ball"
            showCursor={false}
          /><span className="bounce-period">.</span>
        </p>
      </div>

      <div ref={s4Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-3xl md:text-4xl text-gray-400 italic text-center max-w-2xl leading-relaxed px-8">
          <TypingText ref={t4aRef} text="You had a " showCursor={false} /><span
            ref={weirdRef}
            className="weird-word not-italic"
            style={{ opacity: 0 }}
          >weird</span><TypingText ref={t4bRef} text=" idea." charDelay={0.07} />
        </p>
      </div>

      <div ref={s5Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-xl md:text-2xl text-gray-500 text-center">
          <TypingText ref={t5aRef} text="You posted it in #do-more-weird." showCursor={false} />
        </p>
        <p className="relative z-10 text-xl md:text-2xl text-gray-500 text-center">
          <TypingText ref={t5bRef} text="We gave you the fire emoji." showCursor={false} />
        </p>
        <p className="relative z-10 font-terminal text-5xl md:text-7xl text-white text-center">
          <TypingText ref={t5cRef} text="Nothing was built." />
        </p>
      </div>

      <div ref={s6Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-5 overflow-hidden">
        <Scanlines />
        <TypingText
          ref={t6aRef}
          text="You have been..."
          className="relative z-10 text-sm tracking-[0.4em] text-gray-500 uppercase"
          showCursor={false}
          charDelay={0.07}
        />
        <TypingText
          ref={t6bRef}
          text="comfortable."
          className="relative z-10 font-terminal text-8xl md:text-[12rem] text-white italic leading-none"
          charDelay={0.09}
        />
      </div>

      <div ref={s7Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <TypingText
          ref={t7Ref}
          text="This ends now."
          className="relative z-10 font-terminal text-7xl md:text-9xl text-[#ff2222] tracking-wide text-center px-8"
          charDelay={0.07}
        />
      </div>

      <div ref={s8Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center px-8 overflow-hidden">
        <Scanlines />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <p className="font-terminal text-7xl md:text-[10rem] text-white tracking-widest text-center leading-none">
              <TypingText ref={t8Ref} text="DO MORE WEIRD." charDelay={0.06} />
            </p>
            {TEXT_TEARS.map(([top, bottom], i) => (
              <p
                key={i}
                ref={(el) => { s8TearRefs.current[i] = el }}
                className="font-terminal absolute inset-0 text-7xl md:text-[10rem] text-white tracking-widest text-center leading-none pointer-events-none"
                style={{ clipPath: `inset(${top}% 0 ${bottom}% 0)`, opacity: 0 }}
                aria-hidden
              >
                DO MORE WEIRD.
              </p>
            ))}
          </div>
          <p ref={s8TagRef} className="text-gray-600 tracking-widest text-sm">[ TRANSMISSION TERMINATED ]</p>
        </div>
      </div>

    </main>
  )
}
