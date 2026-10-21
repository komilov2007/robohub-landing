import { DASHBOARD } from "../../robosell.content";
import Dashboard from "./dashboard";

// 5-bo'lim qobig'i: sarlavha server'da, jonli widgetlar — dashboard.tsx.
export default function DashboardSection() {
  return (
    <section className="rs-dsec" id="features" aria-labelledby="dash-title">
      <div className="rs-wrap">
        <header className="rs-head2">
          <p className="rs-kicker" data-rv="">
            <span>05</span>
            {DASHBOARD.eyebrow}
          </p>
          <h2 className="rs-title" id="dash-title" data-rv="">
            {DASHBOARD.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {DASHBOARD.lead}
          </p>
        </header>
        <Dashboard />
      </div>
    </section>
  );
}
