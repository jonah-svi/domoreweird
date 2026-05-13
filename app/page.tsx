"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Horizontal tear bands: [inset-top%, inset-bottom%] — each is a copy of the screenshot
// clipped to a horizontal strip that GSAP shifts sideways
const TEAR_BANDS: [number, number][] = [
  [0, 82],
  [13, 61],
  [34, 46],
  [51, 31],
  [66, 17],
  [81, 0],
]

export default function Page() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Screenshot layer
  const screenshotWrapperRef = useRef<HTMLDivElement>(null)
  const screenshotRef        = useRef<HTMLDivElement>(null)
  const channelARef          = useRef<HTMLDivElement>(null)
  const channelBRef          = useRef<HTMLDivElement>(null)
  const sliceARef            = useRef<HTMLDivElement>(null)
  const sliceBRef            = useRef<HTMLDivElement>(null)
  const scanlineRef          = useRef<HTMLDivElement>(null)
  const noiseCanvasRef       = useRef<HTMLCanvasElement>(null)
  const flashRef             = useRef<HTMLDivElement>(null)
  const tearRefs             = useRef<(HTMLDivElement | null)[]>([])
  const feDisplaceRef        = useRef<SVGFEDisplacementMapElement>(null)

  // Dark scenes
  const s1Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)
  const s4Ref = useRef<HTMLDivElement>(null)
  const s5Ref = useRef<HTMLDivElement>(null)
  const s6Ref = useRef<HTMLDivElement>(null)
  const s7Ref = useRef<HTMLDivElement>(null)
  const s8Ref = useRef<HTMLDivElement>(null)

  // Live canvas static noise — runs at ~20fps, GSAP controls opacity
  useEffect(() => {
    const canvas = noiseCanvasRef.current
    if (!canvas) return
    let frame: number
    let last = 0
    const W = 240, H = 180

    function tick(t: number) {
      frame = requestAnimationFrame(tick)
      if (t - last < 50) return
      last = t
      const c = noiseCanvasRef.current
      if (!c) return
      c.width = W
      c.height = H
      const ctx = c.getContext("2d")
      if (!ctx) return
      const img = ctx.createImageData(W, H)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

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

      const tears = tearRefs.current

      // ── ACT 1: GLITCH BUILDUP (0 → 0.44) ────────────────────────────

      tl.to(scanlineRef.current, { opacity: 0.7, duration: 0.04 }, 0.04)

      // Subtle jitter
      tl.to(screenshotRef.current, { x: 4,  duration: 0.02 }, 0.05)
      tl.to(screenshotRef.current, { x: -3, duration: 0.02 }, 0.07)
      tl.to(screenshotRef.current, { x: 2,  duration: 0.02 }, 0.09)
      tl.to(screenshotRef.current, { x: 0,  duration: 0.02 }, 0.11)

      // Channel ghosts
      tl.to(channelARef.current, { opacity: 0.2, x: 5,  duration: 0.05 }, 0.13)
      tl.to(channelBRef.current, { opacity: 0.18, x: -5, duration: 0.05 }, 0.13)

      // Displacement filter warms up
      tl.to(feDisplaceRef.current, { attr: { scale: 18 }, duration: 0.08 }, 0.15)

      // Medium jitter
      tl.to(screenshotRef.current, { x: -11, y: 3,  duration: 0.025 }, 0.19)
      tl.to(screenshotRef.current, { x: 9,   y: -2, duration: 0.025 }, 0.215)
      tl.to(screenshotRef.current, { x: -13, y: 0,  duration: 0.025 }, 0.24)
      tl.to(screenshotRef.current, { x: 0,   y: 0,  duration: 0.025 }, 0.265)

      // Color bleed
      tl.to(screenshotRef.current,
        { filter: "hue-rotate(45deg) saturate(2.5) brightness(1.15)", duration: 0.05 }, 0.23)
      tl.to(screenshotRef.current,
        { filter: "hue-rotate(0deg) saturate(1) brightness(1)", duration: 0.04 }, 0.29)

      // Channel splits intensify
      tl.to(channelARef.current, { opacity: 0.55, x: 16,  duration: 0.06 }, 0.29)
      tl.to(channelBRef.current, { opacity: 0.5,  x: -14, duration: 0.06 }, 0.29)

      // CSS keyframe slices kick in
      tl.to(sliceARef.current, { opacity: 0.6, duration: 0.04 }, 0.32)
      tl.to(sliceBRef.current, { opacity: 0.5, duration: 0.04 }, 0.32)

      // Displacement spike 1
      tl.to(feDisplaceRef.current, { attr: { scale: 70 }, duration: 0.03 }, 0.30)
      tl.to(feDisplaceRef.current, { attr: { scale: 8  }, duration: 0.02 }, 0.33)

      // ── SCREEN TEARS appear ───────────────────────────────────────────
      tl.to(tears[0], { x: 48,  opacity: 1, duration: 0.015 }, 0.34)
      tl.to(tears[1], { x: -35, opacity: 1, duration: 0.015 }, 0.34)
      tl.to(tears[2], { x: 62,  opacity: 1, duration: 0.015 }, 0.355)
      tl.to(tears[3], { x: -50, opacity: 1, duration: 0.015 }, 0.355)
      tl.to(tears[4], { x: 40,  opacity: 1, duration: 0.015 }, 0.37)
      tl.to(tears[5], { x: -65, opacity: 1, duration: 0.015 }, 0.37)

      // Flash 1
      tl.to(flashRef.current, { opacity: 0.45, duration: 0.01  }, 0.375)
      tl.to(flashRef.current, { opacity: 0,    duration: 0.012 }, 0.385)

      // Heavy color burst
      tl.to(screenshotRef.current,
        { x: 24, y: -7, filter: "hue-rotate(180deg) saturate(7) brightness(2.2)", duration: 0.022 }, 0.34)
      tl.to(screenshotRef.current,
        { x: -20, y: 6, filter: "invert(1)", duration: 0.022 }, 0.362)
      tl.to(screenshotRef.current,
        { x: 30, y: 0, filter: "hue-rotate(270deg) saturate(9)", duration: 0.02 }, 0.384)
      tl.to(screenshotRef.current, { x: -25, y: 5, duration: 0.02 }, 0.404)
      tl.to(screenshotRef.current,
        { x: 20, y: -4, filter: "invert(0) hue-rotate(360deg) saturate(20)", duration: 0.022 }, 0.424)

      tl.to(channelARef.current, { opacity: 1, x: 22,  duration: 0.04 }, 0.39)
      tl.to(channelBRef.current, { opacity: 0.9, x: -20, duration: 0.04 }, 0.39)
      tl.to([sliceARef.current, sliceBRef.current], { opacity: 0.9, duration: 0.04 }, 0.39)

      // Noise slams in
      tl.to(noiseCanvasRef.current, { opacity: 0.3, duration: 0.02 }, 0.38)

      // Tears shift — second position
      tl.to(tears[0], { x: -30, duration: 0.015 }, 0.39)
      tl.to(tears[1], { x: 58,  duration: 0.015 }, 0.39)
      tl.to(tears[2], { x: -42, duration: 0.015 }, 0.40)
      tl.to(tears[3], { x: 35,  duration: 0.015 }, 0.40)
      tl.to(tears[4], { x: -58, duration: 0.015 }, 0.41)
      tl.to(tears[5], { x: 48,  duration: 0.015 }, 0.41)

      // Displacement max
      tl.to(feDisplaceRef.current, { attr: { scale: 130 }, duration: 0.02 }, 0.39)
      tl.to(feDisplaceRef.current, { attr: { scale: 25  }, duration: 0.02 }, 0.41)

      // Flash 2 — stronger
      tl.to(flashRef.current, { opacity: 0.75, duration: 0.01  }, 0.41)
      tl.to(flashRef.current, { opacity: 0,    duration: 0.015 }, 0.42)

      // Noise peaks
      tl.to(noiseCanvasRef.current, { opacity: 0.65, duration: 0.02 }, 0.41)

      // Extreme tears before wipe
      tl.to(tears[0], { x: 90,  duration: 0.01 }, 0.43)
      tl.to(tears[1], { x: -78, duration: 0.01 }, 0.43)
      tl.to(tears[2], { x: 100, duration: 0.01 }, 0.43)
      tl.to(tears[3], { x: -88, duration: 0.01 }, 0.43)
      tl.to(tears[4], { x: 72,  duration: 0.01 }, 0.43)
      tl.to(tears[5], { x: -98, duration: 0.01 }, 0.43)

      tl.to(feDisplaceRef.current, { attr: { scale: 200 }, duration: 0.01 }, 0.43)

      // Final blinding flash
      tl.to(flashRef.current, { opacity: 1,   duration: 0.008 }, 0.435)
      tl.to(flashRef.current, { opacity: 0,   duration: 0.01  }, 0.443)

      // ── ACT 2: THE WIPE (0.44 → 0.60) ───────────────────────────────
      tl.to(screenshotWrapperRef.current, {
        clipPath: "inset(0 100% 0 0)",
        skewX: 2,
        ease: "power3.inOut",
        duration: 0.16,
      }, 0.44)

      // ── ACT 3: DARK SCENES (0.50 → 1.0) ─────────────────────────────
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

      scene(s1Ref, 0.50, 0.58)
      scene(s2Ref, 0.59, 0.67)
      scene(s3Ref, 0.68, 0.74)
      scene(s4Ref, 0.75, 0.81)
      scene(s5Ref, 0.82, 0.88)
      scene(s6Ref, 0.89, 0.93)
      scene(s7Ref, 0.94, 0.97)
      scene(s8Ref, 0.97, 1.01)
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const screenshotBg = {
    backgroundImage: "url('/posthog-screenshot.png')",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
  }

  return (
    <main ref={wrapperRef} className="relative h-[1500vh]">

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

        <div ref={s8Ref} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-12 px-8" style={{ opacity: 0 }}>
          <p className="text-5xl md:text-8xl font-bold text-white tracking-widest text-center leading-none">
            DO MORE WEIRD.
          </p>
          <div className="w-full max-w-3xl aspect-video border border-gray-800 flex items-center justify-center">
            <span className="text-gray-600 tracking-widest text-sm">[ TRANSMISSION INCOMING ]</span>
          </div>
        </div>

        {/* ── SCREENSHOT WRAPPER ─────────────────────────────────────── */}
        <div ref={screenshotWrapperRef} className="absolute inset-0 z-20">

          {/* SVG displacement filter definition */}
          <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden>
            <defs>
              <filter id="glitch-distort" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.025 0.006"
                  numOctaves="3"
                  seed="8"
                  result="noise"
                />
                <feDisplacementMap
                  ref={feDisplaceRef}
                  in="SourceGraphic"
                  in2="noise"
                  scale="0"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Main screenshot — displacement filter applied via wrapper */}
          <div className="absolute inset-0" style={{ filter: "url(#glitch-distort)" }}>
            <div ref={screenshotRef} className="absolute inset-0" style={screenshotBg} />
          </div>

          {/* Screen tear bands — copies of screenshot, each clipped to a horizontal strip */}
          {TEAR_BANDS.map(([top, bottom], i) => (
            <div
              key={i}
              ref={(el) => { tearRefs.current[i] = el }}
              className="absolute inset-0 pointer-events-none"
              style={{
                ...screenshotBg,
                clipPath: `inset(${top}% 0 ${bottom}% 0)`,
                opacity: 0,
              }}
            />
          ))}

          {/* GSAP-driven channel splits */}
          <div ref={channelARef} className="absolute inset-0 pointer-events-none" style={{
            ...screenshotBg, filter: "saturate(10) hue-rotate(210deg)", mixBlendMode: "screen", opacity: 0,
          }} />
          <div ref={channelBRef} className="absolute inset-0 pointer-events-none" style={{
            ...screenshotBg, filter: "saturate(10) hue-rotate(95deg)", mixBlendMode: "screen", opacity: 0,
          }} />

          {/* CSS keyframe glitch slices */}
          <div ref={sliceARef} className="absolute inset-0 glitch-slice-a pointer-events-none" style={{
            ...screenshotBg, filter: "saturate(12) hue-rotate(200deg)", mixBlendMode: "screen", opacity: 0,
          }} />
          <div ref={sliceBRef} className="absolute inset-0 glitch-slice-b pointer-events-none" style={{
            ...screenshotBg, filter: "saturate(8) hue-rotate(100deg)", mixBlendMode: "screen", opacity: 0,
          }} />

          {/* Rolling scanline beam */}
          <div
            ref={scanlineRef}
            className="absolute inset-x-0 pointer-events-none scanline-beam"
            style={{
              height: "100px", top: 0, opacity: 0,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 50%, transparent)",
            }}
          />

          {/* Canvas static noise */}
          <canvas
            ref={noiseCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0, imageRendering: "pixelated", mixBlendMode: "screen" }}
          />

          {/* White flash overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ opacity: 0 }}
          />

        </div>
        {/* ── end screenshot wrapper ─────────────────────────────────── */}

      </div>
      {/* ── end sticky ───────────────────────────────────────────────── */}

    </main>
  )
}
