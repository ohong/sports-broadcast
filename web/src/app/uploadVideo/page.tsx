import Image from "next/image";

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#fff7ee]/80 backdrop-blur supports-[backdrop-filter]:bg-[#fff7ee]/60">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-[18px] font-semibold text-ink-900">
          <Image
            src="/logo.png"
            alt="PlayVoice logo"
            width={60}
            height={60}
            className="h-15 w-15"
            priority
          />
          <span>PlayVoice</span>
        </div>
        <nav className="hidden items-center gap-6 text-[14px] font-medium text-ink-700 sm:flex">
          <a className="hover:opacity-80" href="/">
            Home
          </a>
          <a className="hover:opacity-80" href="#features">
            How it works
          </a>
          <a className="hover:opacity-80" href="#highlights">
            Highlights
          </a>
          <a className="hover:opacity-80" href="#faq">
            FAQ
          </a>
          <a
            className="ml-2 inline-flex items-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-4 py-2 font-semibold text-ink-900 float"
            href="/"
          >
            Back to Home
          </a>
        </nav>
      </div>
    </header>
  );
}

function UploadSection() {
  return (
    <section className="bg-sand py-24 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-700">
            upload your game footage
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] text-ink-900 sm:text-5xl lg:text-[58px]">
            Ready to create your highlight reel?
          </h1>
          <p className="mt-4 text-lg leading-7 text-ink-700 sm:text-xl sm:leading-8 max-w-2xl mx-auto">
            Drop your video file here and we'll transform it into a professional sports broadcast with AI commentary.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass relative overflow-hidden rounded-3xl border border-white/60 p-8 shadow-soft">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-sea-300 rounded-2xl p-12 text-center hover:border-sea-500 transition-colors duration-200">
              <div className="flex flex-col items-center gap-6">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-sea-100 text-sea-500">
                  <UploadIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ink-900 mb-2">
                    Drop your video here
                  </h3>
                  <p className="text-ink-700 mb-4">
                    Supports MP4, MOV, AVI files up to 2GB
                  </p>
                  <button className="float inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-6 py-3 text-base font-semibold text-ink-900 shadow-soft">
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            {/* Video Preview Area */}
            <div className="mt-8 rounded-2xl bg-white/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-ink-900">Video Preview</h4>
                <span className="text-sm text-ink-700">No file selected</span>
              </div>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-sea-100 to-sea-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex size-12 items-center justify-center rounded-full bg-white/70 text-sea-500 mb-3">
                    <PlayIcon />
                  </div>
                  <p className="text-sm text-ink-700">Upload a video to see preview</p>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white/50 p-6">
                <h4 className="text-lg font-semibold text-ink-900 mb-4">Sport Type</h4>
                <div className="grid grid-cols-2 gap-3">
                  {["Basketball", "Soccer", "Baseball", "Hockey"].map((sport) => (
                    <button
                      key={sport}
                      className="rounded-xl border border-line bg-white/70 px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-white/90 transition-colors"
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/50 p-6">
                <h4 className="text-lg font-semibold text-ink-900 mb-4">Commentary Style</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="style" className="text-sea-500" />
                    <span className="text-sm text-ink-700">Youth-friendly & encouraging</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="style" className="text-sea-500" />
                    <span className="text-sm text-ink-700">Professional play-by-play</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="style" className="text-sea-500" />
                    <span className="text-sm text-ink-700">Casual & fun</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="float inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-8 py-4 text-lg font-semibold text-ink-900 shadow-soft">
                Generate Commentary
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border border-line px-8 py-4 text-lg font-semibold text-ink-700 hover:bg-white/70 transition-colors">
                Save as Draft
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 rounded-2xl bg-white/50 p-6">
            <h4 className="text-lg font-semibold text-ink-900 mb-4">💡 Pro Tips</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="inline-flex size-8 items-center justify-center rounded-full bg-sea-100 text-sea-500 text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Keep it steady</p>
                  <p className="text-sm text-ink-700">Less camera shake = better AI analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="inline-flex size-8 items-center justify-center rounded-full bg-sea-100 text-sea-500 text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Good lighting</p>
                  <p className="text-sm text-ink-700">Clear visibility helps track players</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="inline-flex size-8 items-center justify-center rounded-full bg-sea-100 text-sea-500 text-sm font-semibold">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Include audio</p>
                  <p className="text-sm text-ink-700">Crowd noise adds to the atmosphere</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="inline-flex size-8 items-center justify-center rounded-full bg-sea-100 text-sea-500 text-sm font-semibold">
                  4
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Full game or highlights</p>
                  <p className="text-sm text-ink-700">Both work great for commentary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-sea-deep py-10 text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Image
              src="/logo.png"
              alt="PlayVoice logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <span>PlayVoice</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/80">
            PlayVoice delivers custom commentary for youth sports footage—because every game deserves a play-by-play.
          </p>
        </div>
        <div className="grid max-w-md grid-cols-2 gap-6 text-sm text-white/75 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Product</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#features">Features</a></li>
              <li><a className="hover:text-white" href="#highlights">Pipeline</a></li>
              <li><a className="hover:text-white" href="#faq">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Community</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#">Youth leagues</a></li>
              <li><a className="hover:text-white" href="#">Booster clubs</a></li>
              <li><a className="hover:text-white" href="#">Coaches</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Support</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#">Help center</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
              <li><a className="hover:text-white" href="#">Status</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/60">© {new Date().getFullYear()} PlayVoice. All rights reserved.</p>
    </footer>
  );
}

function UploadIcon() {
  return (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
    </svg>
  );
}

export default function UploadVideo() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <UploadSection />
      </main>
      <Footer />
    </>
  );
}
