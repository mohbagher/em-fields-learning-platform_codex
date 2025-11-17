import ContentArea from './components/ContentArea';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Learning Platform</p>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">EM Fields</h1>
          </div>
          <p className="text-sm text-slate-400">Interactive modules for electromagnetic fields and wireless communications.</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[1fr_2fr_1fr]">
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <h2 className="text-lg font-semibold text-white">Modules</h2>
          <p className="mt-2 text-sm text-slate-400">Module navigation coming soon.</p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <h2 className="sr-only">Content Area</h2>
          <ContentArea />
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <h2 className="text-lg font-semibold text-white">Sections</h2>
          <p className="mt-2 text-sm text-slate-400">Section navigation coming soon.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
