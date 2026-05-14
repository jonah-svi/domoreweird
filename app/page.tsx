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
  const s1Ref   = useRef<HTMLDivElement>(null)
  const s2Ref   = useRef<HTMLDivElement>(null)
  const s3Ref   = useRef<HTMLDivElement>(null)
  const s4Ref   = useRef<HTMLDivElement>(null)
  const s5Ref   = useRef<HTMLDivElement>(null)
  const sWhyRef = useRef<HTMLDivElement>(null)
  const s6Ref   = useRef<HTMLDivElement>(null)
  const s6bRef  = useRef<HTMLDivElement>(null)
  const s6cRef  = useRef<HTMLDivElement>(null)
  const sToRef   = useRef<HTMLDivElement>(null)
  const s7Ref   = useRef<HTMLDivElement>(null)
  const s7bRef  = useRef<HTMLDivElement>(null)
  const s8Ref   = useRef<HTMLDivElement>(null)

  // Why scene
  const whyRefs        = useRef<(HTMLSpanElement | null)[]>([])
  const whyTickerFnRef = useRef<(() => void) | null>(null)

  // To scene: figure-8 ticker
  const toWordRefs         = useRef<(HTMLSpanElement | null)[]>([])
  const toFigure8TickerRef = useRef<(() => void) | null>(null)

  // Typing handles
  const t1Ref  = useRef<TypingHandle>(null)
  const t2aRef = useRef<TypingHandle>(null)
  const t2bRef = useRef<TypingHandle>(null)
  const t3aRef = useRef<TypingHandle>(null)
  const t3bRef = useRef<TypingHandle>(null)
  const t4Ref  = useRef<TypingHandle>(null)
  const t4bRef = useRef<TypingHandle>(null)
  const weirdRef = useRef<HTMLSpanElement>(null)
  const t5aRef = useRef<TypingHandle>(null)
  const t5bRef = useRef<TypingHandle>(null)
  const t5cRef = useRef<TypingHandle>(null)
  const t6aRef = useRef<TypingHandle>(null)
  const t6bRef = useRef<TypingHandle>(null)
  const t6cRef = useRef<TypingHandle>(null)
  const t6dRef = useRef<TypingHandle>(null)
  const t6eRef = useRef<TypingHandle>(null)
  const t6fRef = useRef<TypingHandle>(null)
  const t7Ref  = useRef<TypingHandle>(null)
  const t7bRef = useRef<TypingHandle>(null)
  const t8Ref  = useRef<TypingHandle>(null)

  // Scene 1 glitch elements
  const s1PosthogRef = useRef<HTMLParagraphElement>(null)
  const s1WeirdRef   = useRef<HTMLParagraphElement>(null)
  const s1TearRefs   = useRef<(HTMLParagraphElement | null)[]>([])

  // Final scene glitch
  const s8TagRef   = useRef<HTMLParagraphElement>(null)
  const s8MainRef  = useRef<HTMLParagraphElement>(null)
  const s8DemoRef  = useRef<HTMLParagraphElement>(null)
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

      // ── SCENE 1 GLITCH: WE ARE POSTHOG → WE ARE WEIRD ───────────
      const s1TearColors = [
        "hue-rotate(200deg) saturate(10)",
        "invert(1)",
        "hue-rotate(90deg) saturate(8)",
        "invert(0.8) hue-rotate(300deg)",
        "hue-rotate(150deg) saturate(6)",
      ]
      const s1Offsets1 = [-52, 38, -64, 30, -44]
      const s1Offsets2 = [42, -55, 28, -48, 60]
      const s1Tears = s1TearRefs.current

      const s1GlitchTl = gsap.timeline({ paused: true })
      s1Tears.forEach((t, i) => {
        s1GlitchTl.to(t, { x: s1Offsets1[i], opacity: 1, filter: s1TearColors[i], duration: 0.04 }, i === 0 ? ">" : "<")
      })
      s1Tears.forEach((t, i) => {
        s1GlitchTl.to(t, { x: s1Offsets2[i], duration: 0.04 }, i === 0 ? "+=0.06" : "<")
      })
      s1GlitchTl
        .to(s1Tears, { x: 0, filter: "none", duration: 0.05 }, "+=0.04")
        .set(s1PosthogRef.current, { opacity: 0 }, "<+=0.03")
        .set(s1WeirdRef.current, { opacity: 1 }, "<")
        .to(s1Tears, { opacity: 0, duration: 0.08 })

      sceneTyping(s1Ref,
        () => t1Ref.current?.play(() => {
          setTimeout(() => s1GlitchTl.restart(), 800)
        }),
        () => {
          t1Ref.current?.reset()
          s1GlitchTl.pause(0)
          if (s1PosthogRef.current) gsap.set(s1PosthogRef.current, { opacity: 1 })
          if (s1WeirdRef.current) gsap.set(s1WeirdRef.current, { opacity: 0 })
          s1TearRefs.current.forEach(t => { if (t) gsap.set(t, { opacity: 0, x: 0, filter: "none" }) })
        },
      )

      sceneTyping(s2Ref,
        () => {
          t2aRef.current?.play()
          setTimeout(() => t2bRef.current?.play(), 700)
        },
        () => { t2aRef.current?.reset(); t2bRef.current?.reset() },
      )

      sceneTyping(s3Ref,
        () => t3aRef.current?.play(() => {
          setTimeout(() => t3bRef.current?.play(), 200)
        }),
        () => { t3aRef.current?.reset(); t3bRef.current?.reset() },
      )

      sceneTyping(s4Ref,
        () => {
          if (weirdRef.current) gsap.to(weirdRef.current, { opacity: 1, duration: 0.15 })
          setTimeout(() => t4Ref.current?.play(() => t4bRef.current?.play()), 250)
        },
        () => {
          t4Ref.current?.reset()
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

      // ── WHY SCENE: bouncing physics ───────────────────────────────
      const WHY_COUNT = 28
      const WHY_COLORS = ["#ffffff", "#ffffff", "#00ff41", "#ffffff", "#ffffff", "#00ff41", "#ffffff", "#ffffff"]
      const WHY_SIZES  = ["text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-5xl", "text-6xl", "text-4xl"]
      type Particle = { x: number; y: number; vx: number; vy: number }
      let whyParticles: Particle[] = []

      const startWhyScene = () => {
        const W = window.innerWidth
        const H = window.innerHeight
        const els = whyRefs.current.filter((el): el is HTMLSpanElement => !!el)

        // Stop any existing ticker before reinit
        if (whyTickerFnRef.current) {
          gsap.ticker.remove(whyTickerFnRef.current)
          whyTickerFnRef.current = null
        }

        // Init particles below screen, staggered
        whyParticles = els.map((el, i) => {
          const x = 20 + Math.random() * Math.max(W - 180, 0)
          const y = H + 20 + i * 18
          const speed = 1.8 + Math.random() * 2.2
          const vx = (Math.random() - 0.5) * speed
          const vy = -(speed + Math.random() * 1.5)
          gsap.set(el, { x, y, opacity: 1 })
          return { x, y, vx, vy }
        })

        const fn = () => {
          const W = window.innerWidth
          const H = window.innerHeight
          els.forEach((el, i) => {
            const p = whyParticles[i]
            if (!p) return
            p.x += p.vx
            p.y += p.vy
            const elW = el.offsetWidth || 90
            const elH = el.offsetHeight || 55
            if (p.x < 0)         { p.x = 0;        p.vx =  Math.abs(p.vx) }
            else if (p.x > W - elW) { p.x = W - elW; p.vx = -Math.abs(p.vx) }
            if (p.y < 0)         { p.y = 0;        p.vy =  Math.abs(p.vy) }
            else if (p.y > H - elH) { p.y = H - elH; p.vy = -Math.abs(p.vy) }
            gsap.set(el, { x: p.x, y: p.y })
          })
        }
        whyTickerFnRef.current = fn
        gsap.ticker.add(fn)
      }

      const stopWhyScene = () => {
        if (whyTickerFnRef.current) {
          gsap.ticker.remove(whyTickerFnRef.current)
          whyTickerFnRef.current = null
        }
        const els = whyRefs.current.filter((el): el is HTMLSpanElement => !!el)
        gsap.killTweensOf(els)
        els.forEach(el => gsap.set(el, { opacity: 0 }))
        whyParticles = []
      }

      ScrollTrigger.create({
        trigger: sWhyRef.current,
        start: "top 65%",
        onEnter: startWhyScene,
        onLeaveBack: stopWhyScene,
        onLeave: () => {
          if (whyTickerFnRef.current) {
            gsap.ticker.remove(whyTickerFnRef.current)
            whyTickerFnRef.current = null
          }
        },
        onEnterBack: startWhyScene,
      })

      sceneTyping(s6Ref,
        () => { t6aRef.current?.play(() => setTimeout(() => t6bRef.current?.play(), 200)) },
        () => { t6aRef.current?.reset(); t6bRef.current?.reset() },
      )

      sceneTyping(s6bRef,
        () => { t6cRef.current?.play(() => setTimeout(() => t6dRef.current?.play(), 200)) },
        () => { t6cRef.current?.reset(); t6dRef.current?.reset() },
      )

      sceneTyping(s6cRef,
        () => { t6eRef.current?.play(() => setTimeout(() => t6fRef.current?.play(), 200)) },
        () => { t6eRef.current?.reset(); t6fRef.current?.reset() },
      )

      // ── TO SCENE: figure-8 (lemniscate) ticker ───────────────────
      // Lemniscate of Bernoulli: x = rx*cos(t)/(1+sin²t), y = ry*sin(t)*cos(t)/(1+sin²t)
      const lemni = (t: number, rx: number, ry: number) => {
        const s = Math.sin(t)
        const d = 1 + s * s
        return { x: rx * Math.cos(t) / d, y: ry * Math.sin(t) * Math.cos(t) / d }
      }
      const TO_ITEMS_N = 6
      const TO_RX = 300   // horizontal half-span
      const TO_RY = 150   // vertical half-span
      const TO_SPEED = (Math.PI * 2) / (60 * 14)  // one full loop per 14s @ 60fps
      let figAngle = 0

      const startFigure8 = () => {
        const els = toWordRefs.current.filter((el): el is HTMLSpanElement => !!el)
        if (els.length === 0) return
        if (toFigure8TickerRef.current) gsap.ticker.remove(toFigure8TickerRef.current)
        const fn = () => {
          figAngle += TO_SPEED
          els.forEach((el, i) => {
            const t = figAngle + (i / TO_ITEMS_N) * Math.PI * 2
            const { x, y } = lemni(t, TO_RX, TO_RY)
            const normX = Math.abs(x) / TO_RX   // 0 at center crossing, 1 at lobe tips
            const scale = 0.6 + 0.4 * normX
            const opacity = 0.3 + 0.7 * normX
            gsap.set(el, { x, y, scale, opacity, xPercent: -50, yPercent: -50, zIndex: Math.round(normX * 10) })
          })
        }
        toFigure8TickerRef.current = fn
        gsap.ticker.add(fn)
      }

      const stopFigure8 = () => {
        if (toFigure8TickerRef.current) {
          gsap.ticker.remove(toFigure8TickerRef.current)
          toFigure8TickerRef.current = null
        }
        toWordRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }) })
      }

      ScrollTrigger.create({
        trigger: sToRef.current,
        start: "top 65%",
        onEnter:     startFigure8,
        onLeaveBack: stopFigure8,
        onLeave:     () => {
          if (toFigure8TickerRef.current) {
            gsap.ticker.remove(toFigure8TickerRef.current)
            toFigure8TickerRef.current = null
          }
        },
        onEnterBack: startFigure8,
      })

      sceneTyping(s7Ref,
        () => t7Ref.current?.play(),
        () => t7Ref.current?.reset(),
      )

      sceneTyping(s7bRef,
        () => t7bRef.current?.play(),
        () => t7bRef.current?.reset(),
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
      loopTl.set(s8DemoRef.current, { opacity: 1 }, "<")
      loopTl.set(s8MainRef.current, { opacity: 0 }, "<")

      loopTl
        .to(tears, { x: 0, opacity: 0, filter: "none", duration: 0.05 }, "+=0.04")
        .to(s8TagRef.current, { opacity: 0.3, duration: 0.03 }, "<")
        .to(s8TagRef.current, { opacity: 0,   duration: 0.02 })
        .to(s8TagRef.current, { opacity: 1,   duration: 0.05 })
        .to(s8DemoRef.current, { opacity: 0,  duration: 0.3 }, "+=0.7")
        .set(s8MainRef.current, { opacity: 1 }, "<")

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

    return () => {
      if (whyTickerFnRef.current) gsap.ticker.remove(whyTickerFnRef.current)
      if (toFigure8TickerRef.current) gsap.ticker.remove(toFigure8TickerRef.current)
      ctx.revert()
    }
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
        <div className="relative z-10">
          {/* Types in first */}
          <p ref={s1PosthogRef} className="font-terminal text-7xl md:text-9xl tracking-widest text-white text-center px-8">
            <TypingText ref={t1Ref} text="WE ARE POSTHOG." />
          </p>
          {/* Revealed after glitch settles */}
          <p ref={s1WeirdRef} className="font-terminal absolute inset-0 text-7xl md:text-9xl tracking-widest text-white text-center px-8 flex items-center justify-center" style={{ opacity: 0 }}>
            WE ARE WEIRD.
          </p>
          {/* Tear bands showing WE ARE WEIRD. — GSAP drives x + filter */}
          {TEXT_TEARS.map(([top, bottom], i) => (
            <p
              key={i}
              ref={(el) => { s1TearRefs.current[i] = el }}
              className="font-terminal absolute inset-0 text-7xl md:text-9xl tracking-widest text-white text-center px-8 flex items-center justify-center pointer-events-none"
              style={{ clipPath: `inset(${top}% 0 ${bottom}% 0)`, opacity: 0 }}
              aria-hidden
            >
              WE ARE WEIRD.
            </p>
          ))}
        </div>
      </div>

      <div ref={s2Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 font-terminal text-4xl md:text-6xl tracking-widest text-[#00ff41] text-center px-8">
          <TypingText ref={t2aRef} text="WE DO NOT FORGIVE BORING." showCursor={false} />
        </p>
        <p className="relative z-10 font-terminal text-4xl md:text-6xl tracking-widest text-[#00ff41] text-center px-8">
          <TypingText ref={t2bRef} text="WE DO NOT FORGET." charDelay={0.055} />
        </p>
      </div>

      <div ref={s3Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <div className="relative z-10 flex flex-col items-center gap-4 px-8 pt-32">
          <p className="font-terminal text-6xl md:text-8xl tracking-wide text-white text-center">
            <TypingText ref={t3aRef} text="And yet..." showCursor={false} />
          </p>
          <p className="font-terminal text-6xl md:text-8xl tracking-wide text-white text-center">
            <TypingText ref={t3bRef} text="we're dropping the ball" showCursor={false} /><span className="bounce-period">.</span>
          </p>
        </div>
      </div>

      <div ref={s4Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <div className="relative z-10 flex flex-col items-center gap-2 px-8">
          <p className="text-3xl md:text-4xl text-gray-400 italic text-center leading-relaxed">
            <span ref={weirdRef} className="weird-word not-italic" style={{ opacity: 0 }}>Weird</span><TypingText ref={t4Ref} text=" ideas are dying in" showCursor={false} charDelay={0.05} />
          </p>
          <p className="text-3xl md:text-4xl text-gray-400 italic text-center whitespace-nowrap leading-relaxed">
            <TypingText ref={t4bRef} text="#do-more-weird." charDelay={0.05} />
          </p>
        </div>
      </div>

      <div ref={s5Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-xl md:text-2xl text-gray-500 text-center">
          <TypingText ref={t5aRef} text="We post in #do-more-weird." showCursor={false} />
        </p>
        <p className="relative z-10 text-xl md:text-2xl text-gray-500 text-center">
          <TypingText ref={t5bRef} text="We give each other fire emojis." showCursor={false} />
        </p>
        <p className="relative z-10 font-terminal text-5xl md:text-7xl text-white text-center">
          <TypingText ref={t5cRef} text="Nothing gets built." />
        </p>
      </div>

      {/* ── WHY SCENE ──────────────────────────────────────────────── */}
      <div ref={sWhyRef} className="relative h-screen bg-[#050505] overflow-hidden">
        <Scanlines />
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            ref={(el) => { whyRefs.current[i] = el }}
            className={`font-terminal absolute pointer-events-none select-none ${
              ["text-4xl","text-5xl","text-6xl","text-7xl","text-5xl","text-6xl","text-4xl"][i % 7]
            }`}
            style={{
              opacity: 0,
              color: ["#ffffff","#ffffff","#00ff41","#ffffff","#ffffff","#00ff41","#ffffff","#ffffff"][i % 8],
            }}
          >
            Why?
          </span>
        ))}
      </div>

      <div ref={s6Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-5 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-sm tracking-[0.4em] text-gray-500 uppercase text-center">
          <TypingText ref={t6aRef} text="We have become..." showCursor={false} charDelay={0.07} />
        </p>
        <p className="relative z-10 font-terminal text-8xl md:text-[12rem] text-white italic leading-none text-center">
          <TypingText ref={t6bRef} text="comfortable." charDelay={0.09} />
        </p>
      </div>

      <div ref={s6bRef} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-5 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-sm tracking-[0.4em] text-gray-500 uppercase text-center">
          <TypingText ref={t6cRef} text="We have become..." showCursor={false} charDelay={0.07} />
        </p>
        <p className="relative z-10 font-terminal text-8xl md:text-[12rem] text-white italic leading-none text-center">
          <TypingText ref={t6dRef} text="complacent." charDelay={0.09} />
        </p>
      </div>

      <div ref={s6cRef} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center gap-5 overflow-hidden">
        <Scanlines />
        <p className="relative z-10 text-sm tracking-[0.4em] text-gray-500 uppercase text-center">
          <TypingText ref={t6eRef} text="We have become..." showCursor={false} charDelay={0.07} />
        </p>
        <p className="relative z-10 font-terminal text-8xl md:text-[12rem] text-white italic leading-none text-center">
          <TypingText ref={t6fRef} text="conditioned." charDelay={0.09} />
        </p>
      </div>

      <div ref={sToRef} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        {/* Origin point — words orbit around this via GSAP x/y */}
        <div style={{ position: "relative", width: 0, height: 0 }}>
          {([
            { text: "To validation.", color: "#ffffff" },
            { text: "To dopamine.",   color: "#00ff41" },
            { text: "To inaction.",   color: "#ff2222" },
            { text: "To validation.", color: "#ffffff" },
            { text: "To dopamine.",   color: "#00ff41" },
            { text: "To inaction.",   color: "#ff2222" },
          ] as { text: string; color: string }[]).map((item, i) => (
            <span
              key={i}
              ref={(el) => { toWordRefs.current[i] = el }}
              className="font-terminal text-5xl md:text-6xl tracking-widest"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: item.color,
                whiteSpace: "nowrap",
                opacity: 0,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div ref={s7Ref} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <p className="relative z-10 font-terminal text-7xl md:text-9xl text-[#ff2222] tracking-wide text-center px-8">
          <TypingText ref={t7Ref} text="This ends now." charDelay={0.07} />
        </p>
      </div>

      <div ref={s7bRef} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        <Scanlines />
        <p className="relative z-10 font-terminal text-7xl md:text-9xl text-[#ff2222] tracking-wide text-center px-8 whitespace-nowrap">
          <TypingText ref={t7bRef} text="Kill #do-more-weird." charDelay={0.07} />
        </p>
      </div>

      <div ref={s8Ref} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center px-8 overflow-hidden">
        <Scanlines />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative overflow-hidden">
            <p ref={s8MainRef} className="font-terminal text-7xl md:text-[10rem] text-white tracking-widest text-center leading-none">
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
            <p
              ref={s8DemoRef}
              className="font-terminal absolute inset-0 text-7xl md:text-[10rem] text-[#00ff41] tracking-widest text-center leading-none pointer-events-none"
              style={{ opacity: 0 }}
              aria-hidden
            >
              DEMO MORE WEIRD.
            </p>
          </div>
          <p ref={s8TagRef} className="text-gray-600 tracking-widest text-sm">[ TRANSMISSION TERMINATED ]</p>
        </div>
      </div>

    </main>
  )
}
