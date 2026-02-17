import { useState } from 'react'

type Screen = 'onboarding' | 'dashboard' | 'subjectMap' | 'play' | 'review'

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-100 via-sky-50 to-white">
      <header className="border-b border-sky-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-lg font-bold text-white shadow-sm">
              Q
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-700">
                QuestMind (Age 10–13)
              </p>
              <p className="text-xs text-slate-500">
                Turn questions into fun puzzles
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm hover:bg-amber-300"
          >
            Demo Kid · Level 2
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-4">
        {screen === 'onboarding' && (
          <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4">
            <h1 className="text-center text-2xl font-bold text-slate-900">
              Welcome, young explorer! 🚀
            </h1>
            <p className="text-center text-sm text-slate-600">
              Choose your grade and favourite subjects. We&apos;ll turn them
              into fun little missions.
            </p>
            <div className="mt-2 grid gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Step 1 · Your grade
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['5', '6', '7', '8'].map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 hover:bg-sky-200"
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Step 2 · Pick subjects
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  {['Math', 'Science', 'English', 'History'].map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-left font-semibold text-slate-800 shadow-sm hover:bg-sky-50"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                        {subject[0]}
                      </span>
                      <span>{subject}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScreen('dashboard')}
                className="mt-2 rounded-full bg-sky-500 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-600"
              >
                Start my adventure
              </button>
            </div>
          </section>
        )}

        {screen === 'dashboard' && (
          <section className="flex flex-1 flex-col gap-4 py-2">
            <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-400 p-4 text-white shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Today&apos;s mission
              </p>
              <p className="mt-1 text-lg font-bold">
                Solve 8 Math puzzles and reach Level 3!
              </p>
              <button
                type="button"
                onClick={() => setScreen('subjectMap')}
                className="mt-3 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-sky-700 hover:bg-white"
              >
                Go to Math map
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {['Math', 'Science', 'English'].map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => setScreen('subjectMap')}
                  className="flex flex-col items-start rounded-2xl bg-white/90 p-3 text-left shadow-sm ring-1 ring-sky-100 hover:bg-sky-50"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white">
                    {subject[0]}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-slate-900">
                    {subject}
                  </span>
                  <span className="mt-1 text-xs text-slate-600">
                    Level 2 · 12/20 stars
                  </span>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-amber-400" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {screen === 'subjectMap' && (
          <section className="flex flex-1 flex-col gap-4 py-2">
            <button
              type="button"
              onClick={() => setScreen('dashboard')}
              className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Back to dashboard
            </button>
            <h2 className="text-lg font-bold text-slate-900">
              Math · Level path
            </h2>
            <div className="mt-1 flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-sm">
              <p className="text-xs text-slate-600">
                Each island is a level. Collect stars to unlock the next one!
              </p>
              <div className="grid gap-3 md:grid-cols-4">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setScreen('play')}
                    className="flex flex-col items-center rounded-2xl bg-sky-50 p-3 text-xs font-semibold text-sky-800 shadow-sm hover:bg-sky-100"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
                      {level}
                    </span>
                    <span className="mt-2">Level {level}</span>
                    <span className="mt-1 text-[11px] text-slate-600">
                      {level <= 2 ? 'Unlocked' : 'Locked'}
                    </span>
                    <span className="mt-1 text-amber-400">
                      {'★'.repeat(level)}{' '}
                      <span className="text-slate-300">
                        {'★'.repeat(3 - level)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {screen === 'play' && (
          <section className="flex flex-1 flex-col gap-4 py-2">
            <button
              type="button"
              onClick={() => setScreen('subjectMap')}
              className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Back to level map
            </button>
            <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
              <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Level 2 · Question 3 of 10</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800">
                    ⏱ 24s
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Riya has 18 stickers. She gives an equal number of stickers to
                  3 friends and has none left. How many stickers does each
                  friend get?
                </p>
                <div className="mt-2 grid gap-2">
                  {[4, 5, 6, 7].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-sky-50"
                    >
                      <span>{option} stickers</span>
                      <span className="text-xs text-slate-400">Tap to choose</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                  <button
                    type="button"
                    className="rounded-full bg-slate-100 px-3 py-1 font-medium hover:bg-slate-200"
                  >
                    Need a hint?
                  </button>
                  <button
                    type="button"
                    onClick={() => setScreen('review')}
                    className="rounded-full bg-emerald-500 px-3 py-1 font-semibold text-white hover:bg-emerald-600"
                  >
                    Finish demo
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 text-xs text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Mini progress</p>
                <p>Correct: 2 / 3</p>
                <p>Streak: 🔥 2 in a row</p>
                <p>Stars this level: ★★☆</p>
              </div>
            </div>
          </section>
        )}

        {screen === 'review' && (
          <section className="flex flex-1 flex-col items-center justify-center gap-4 py-2 text-center">
            <div className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-md">
              <p className="text-sm font-semibold text-slate-900">
                Great job, explorer! ⭐
              </p>
              <p className="mt-1 text-xs text-slate-600">
                You tried 10 questions, got 7 correct, and earned 2 stars in
                Level 2.
              </p>
              <div className="mt-4 flex justify-center gap-2 text-3xl">
                <span className="text-amber-400">★</span>
                <span className="text-amber-400">★</span>
                <span className="text-slate-200">★</span>
              </div>
              <button
                type="button"
                onClick={() => setScreen('dashboard')}
                className="mt-4 w-full rounded-full bg-sky-500 py-2 text-sm font-semibold text-white hover:bg-sky-600"
              >
                Back to missions
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
