const ContentArea = () => {
  return (
    <div className="flex h-full flex-col gap-4 text-slate-200">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Overview</p>
        <h3 className="text-xl font-semibold">Welcome to the EM Fields Learning Platform</h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-300">
        Select a module and section to begin exploring visual explanations, interactive demos, and intuitive summaries
        about electromagnetic field fundamentals and wireless communication concepts.
      </p>
      <div className="rounded-lg border border-dashed border-emerald-400/30 bg-emerald-400/5 p-4 text-sm text-emerald-100">
        Content area placeholder. Lessons, simulations, and summaries will load here based on the chosen module and section.
      </div>
    </div>
  );
};

export default ContentArea;
