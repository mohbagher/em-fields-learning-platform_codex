import { useMemo, useState } from "react";
import AdvancedExtension from "./components/content/AdvancedExtension";
import ConceptIntro from "./components/content/ConceptIntro";
import ContentArea from "./components/content/ContentArea";
import MainInteractiveWrapper from "./components/content/MainInteractiveWrapper";
import SupportingVisualsGrid from "./components/content/SupportingVisualsGrid";
import TryYourself from "./components/content/TryYourself";
import NavigationFooter from "./components/layout/NavigationFooter";
import ProgressBar from "./components/layout/ProgressBar";
import Header from "./components/layout/Header";
import ModuleNavigation from "./components/navigation/ModuleNavigation";
import SectionNavigation from "./components/navigation/SectionNavigation";
import AnimationControls from "./components/shared/AnimationControls";
import Canvas2D from "./components/shared/Canvas2D";
import ControlPanel from "./components/shared/ControlPanel";
import GraphWrapper from "./components/shared/GraphWrapper";
import Scene3D from "./components/shared/Scene3D";
import { ParameterConfig } from "./types";
import { standingWaveValue, waveValueAt } from "./physics/module3Waves";

function App() {
  const [params, setParams] = useState<Record<string, number | boolean | string>>({
    amplitude: 1,
    frequency: 2,
    phase: 0,
    show3d: true
  });

  const parameterConfigs: ParameterConfig[] = [
    {
      id: "amplitude",
      label: "Amplitude",
      type: "slider",
      default: 1,
      min: 0,
      max: 2,
      step: 0.05,
      description: "Controls the wave height"
    },
    {
      id: "frequency",
      label: "Frequency (Hz)",
      type: "slider",
      default: 2,
      min: 0.5,
      max: 5,
      step: 0.1
    },
    {
      id: "phase",
      label: "Phase (rad)",
      type: "slider",
      default: 0,
      min: 0,
      max: Math.PI * 2,
      step: 0.1
    },
    {
      id: "show3d",
      label: "Show 3D background",
      type: "toggle",
      default: true
    }
  ];

  const points = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => {
        const x = i * 0.25;
        const y = waveValueAt(
          x,
          0,
          params.amplitude as number,
          params.frequency as number,
          params.phase as number
        );
        return { x, y };
      }),
    [params.amplitude, params.frequency, params.phase]
  );

  const standingPoints = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => {
        const x = i * 0.25;
        const y = standingWaveValue(x, 0.5, params.amplitude as number, params.frequency as number);
        return { x, y };
      }),
    [params.amplitude, params.frequency]
  );

  const handleParamChange = (id: string, value: any) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[1fr_2fr_1fr]">
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <ModuleNavigation />
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <ContentArea>
            <ConceptIntro />
            <MainInteractiveWrapper>
              <GraphWrapper title="Traveling wave snapshot" points={points} unit="Amplitude">
                <p className="text-xs text-emerald-100">Waveform samples</p>
              </GraphWrapper>
              <GraphWrapper title="Standing wave profile" points={standingPoints} unit="Amplitude" className="mt-3" />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Canvas2D
                  draw={(ctx, dims) => {
                    ctx.strokeStyle = "#34d399";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let i = 0; i <= 100; i++) {
                      const x = (i / 100) * dims.width;
                      const xMeters = (i / 100) * 6;
                      const yVal = waveValueAt(
                        xMeters,
                        0.3,
                        params.amplitude as number,
                        params.frequency as number,
                        params.phase as number
                      );
                      const y = dims.height / 2 - yVal * 40;
                      if (i === 0) ctx.moveTo(x, y);
                      else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                  }}
                />
                {(params.show3d as boolean) && <Scene3D />}
              </div>
            </MainInteractiveWrapper>
            <SupportingVisualsGrid />
            <ControlPanel parameters={parameterConfigs} values={params} onChange={handleParamChange} />
            <AnimationControls
              isPlaying={false}
              onPlay={() => {}}
              onPause={() => {}}
              onReset={() => setParams({ ...params, phase: 0 })}
              speed={1}
              timeSeconds={0}
            />
            <TryYourself />
            <AdvancedExtension />
          </ContentArea>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/30">
          <SectionNavigation />
          <ProgressBar />
        </section>
      </main>

      <NavigationFooter />
    </div>
  );
}

export default App;
