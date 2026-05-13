"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── Swap this for your YouTube embed URL when ready ──────────────────────────
// e.g. "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0"
const VIDEO_URL = ""

export default function Page() {
  const wrapperRef    = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  // Final scene inner elements (for looping glitch)
  const s8TextRef  = useRef<HTMLParagraphElement>(null)
  const s8TagRef   = useRef<HTMLParagraphElement>(null)
  const s8TearRefs = useRef<(HTMLParagraphElement | null)[]>([])

  // Tear band definitions for final scene: [inset-top%, inset-bottom%]
  const TEXT_TEARS: [number, number][] = [
    [0,  80],
    [15, 60],
    [35, 40],
    [57, 20],
    [78,  0],
  ]

  // Dark scenes
  const s1Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)
  const s4Ref = useRef<HTMLDivElement>(null)
  const s5Ref = useRef<HTMLDivElement>(null)
  const s6Ref = useRef<HTMLDivElement>(null)
  const s7Ref = useRef<HTMLDivElement>(null)
  const s8Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })

      // ── ACT 1: VIDEO (0 → 0.40) — nothing animates, user watches ────

      // ── ACT 2: WIPE (0.40 → 0.53) ───────────────────────────────────
      tl.to(videoWrapperRef.current, {
        clipPath: "inset(0 100% 0 0)",
        skewX: 2,
        ease: "power3.inOut",
        duration: 0.13,
      }, 0.40)

      // ── ACT 3: DARK SCENES (0.55 → 1.0) ─────────────────────────────
      type SceneRef = React.RefObject<HTMLDivElement | null>

      function scene(ref: SceneRef, inAt: number, outAt: number) {
        tl.fromTo(ref.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
          inAt
        )
        if (outAt < 1.01) {
          tl.to(ref.current, { opacity: 0, y: -14, duration: 0.025, ease: "power2.in" }, outAt)
        }
      }

      scene(s1Ref, 0.55, 0.63)
      scene(s2Ref, 0.64, 0.71)
      scene(s3Ref, 0.72, 0.78)
      scene(s4Ref, 0.79, 0.84)
      scene(s5Ref, 0.85, 0.90)
      scene(s6Ref, 0.91, 0.94)
      scene(s7Ref, 0.95, 0.97)
      scene(s8Ref, 0.97, 1.01)

      // ── LOOPING SCREEN-TEAR GLITCH on final scene ────────────────────
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

      // Burst 1 — tears slam in at different offsets
      tears.forEach((t, i) => {
        loopTl.to(t, { x: tearOffsets1[i], opacity: 1, filter: tearColors[i], duration: 0.04 }, i === 0 ? ">" : "<")
      })
      loopTl.to(s8TagRef.current, { opacity: 0, duration: 0.03 }, "<")

      // Hold briefly, then shift to second positions
      tears.forEach((t, i) => {
        loopTl.to(t, { x: tearOffsets2[i], duration: 0.04 }, i === 0 ? "+=0.06" : "<")
      })

      // Reset
      loopTl
        .to(tears, { x: 0, opacity: 0, filter: "none", duration: 0.05 }, "+=0.04")
        .to(s8TagRef.current, { opacity: 0.3, duration: 0.03 }, "<")
        .to(s8TagRef.current, { opacity: 0,   duration: 0.02 })
        .to(s8TagRef.current, { opacity: 1,   duration: 0.05 })

      // Second smaller burst
      loopTl
        .to(tears[1], { x: -30, opacity: 1, filter: tearColors[1], duration: 0.03 }, "+=0.5")
        .to(tears[3], { x: 24,  opacity: 1, filter: tearColors[3], duration: 0.03 }, "<")
        .to(s8TagRef.current, { opacity: 0, duration: 0.03 }, "<")
        .to(tears[1], { x: 0, opacity: 0, filter: "none", duration: 0.04 }, "+=0.05")
        .to(tears[3], { x: 0, opacity: 0, filter: "none", duration: 0.04 }, "<")
        .to(s8TagRef.current, { opacity: 1, duration: 0.04 })

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "96% bottom",
        onEnter: () => loopTl.play(),
        onLeaveBack: () => loopTl.pause(0),
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={wrapperRef} className="relative h-[1200vh]">

      {/* ── Sticky viewport ─────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Dark backdrop */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Persistent scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",
          }}
        />

        {/* ── DARK SCENES ───────────────────────────────────────────── */}

        <div ref={s1Ref} className="absolute inset-0 z-10 flex items-center justify-center" style={{ opacity: 0 }}>
          <p className="text-5xl md:text-7xl font-bold tracking-widest text-white text-center cursor-blink px-8">
            WE ARE POSTHOG.
          </p>
        </div>

        <div ref={s2Ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6" style={{ opacity: 0 }}>
          <p className="text-xl md:text-3xl tracking-widest text-[#00ff41] text-center px-8">WE DO NOT FORGIVE BORING.</p>
          <p className="text-xl md:text-3xl tracking-widest text-[#00ff41] text-center px-8">WE DO NOT FORGET.</p>
        </div>

        <div ref={s3Ref} className="absolute inset-0 z-10 flex items-center justify-center" style={{ opacity: 0 }}>
          <p className="text-5xl md:text-6xl font-bold tracking-[0.25em] text-white text-center px-8">EXPECT US.</p>
        </div>

        <div ref={s4Ref} className="absolute inset-0 z-10 flex items-center justify-center" style={{ opacity: 0 }}>
          <p className="text-2xl md:text-3xl text-gray-400 italic text-center max-w-2xl leading-relaxed px-8">
            You had a weird idea.
          </p>
        </div>

        <div ref={s5Ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl text-gray-500 text-center">You posted it in #do-more-weird.</p>
          <p className="text-xl md:text-2xl text-gray-500 text-center">We gave you the fire emoji.</p>
          <p className="text-3xl md:text-5xl font-bold text-white text-center">Nothing was built.</p>
        </div>

        <div ref={s6Ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5" style={{ opacity: 0 }}>
          <p className="text-sm tracking-[0.4em] text-gray-500 uppercase">You have been...</p>
          <p className="text-6xl md:text-9xl font-bold text-white italic">comfortable.</p>
        </div>

        <div ref={s7Ref} className="absolute inset-0 z-10 flex items-center justify-center" style={{ opacity: 0 }}>
          <p className="text-5xl md:text-7xl font-bold text-[#ff2222] tracking-wide text-center px-8">This ends now.</p>
        </div>

        <div ref={s8Ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center gap-8">
            {/* Text + tear band clones stacked */}
            <div className="relative">
              <p ref={s8TextRef} className="text-5xl md:text-8xl font-bold text-white tracking-widest text-center leading-none">
                DO MORE WEIRD.
              </p>
              {TEXT_TEARS.map(([top, bottom], i) => (
                <p
                  key={i}
                  ref={(el) => { s8TearRefs.current[i] = el }}
                  className="absolute inset-0 text-5xl md:text-8xl font-bold text-white tracking-widest text-center leading-none pointer-events-none"
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

        {/* ── VIDEO WRAPPER — clip-path wipe targets this ───────────── */}
        <div ref={videoWrapperRef} className="absolute inset-0 z-20 bg-black">
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            /* Placeholder — remove once VIDEO_URL is set */
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
      {/* ── end sticky ───────────────────────────────────────────────── */}

    </main>
  )
}
