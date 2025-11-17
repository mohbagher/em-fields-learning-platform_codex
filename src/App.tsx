import AdvancedExtension from './components/content/AdvancedExtension';
import ConceptIntro from './components/content/ConceptIntro';
import ContentArea from './components/content/ContentArea';
import MainInteractiveWrapper from './components/content/MainInteractiveWrapper';
import SupportingVisualsGrid from './components/content/SupportingVisualsGrid';
import TryYourself from './components/content/TryYourself';
import NavigationFooter from './components/layout/NavigationFooter';
import ProgressBar from './components/layout/ProgressBar';
import Header from './components/layout/Header';
import ModuleNavigation from './components/navigation/ModuleNavigation';
import SectionNavigation from './components/navigation/SectionNavigation';
import ControlPanel from './components/shared/ControlPanel';
import GraphWrapper from './components/shared/GraphWrapper';
import Slider from './components/shared/Slider';
import ToggleSwitch from './components/shared/ToggleSwitch';

function App() {
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
              <GraphWrapper>
                <p className="text-xs text-emerald-100">TODO: Inject interactive visualizations here.</p>
              </GraphWrapper>
            </MainInteractiveWrapper>
            <SupportingVisualsGrid />
            <ControlPanel>
              <Slider />
              <ToggleSwitch />
            </ControlPanel>
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
