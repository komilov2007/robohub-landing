import type { Topic } from "../../../lib/academy";
import FeatureExplorer from "./feature-explorer";

// Videodan keyingi bo'lim — "Videoda nima bor" ko'rgazmasi: tepada sarlavha va tavsif, ostida
// interaktiv bandlar va to'q sahnada har bandning o'z animatsiyali vizuali (FeatureExplorer, feature-visuals.tsx).
export default function Showcase({ topic }: { topic: Topic }) {
  return (
    <section id="how" className="acx-show" data-theme="light" aria-labelledby="ac-show-title">
      <div className="container">
        <div className="acx-show__head" data-reveal>
          <div>
            <p className="acx-kicker">Videoda nima bor</p>
            <h2 id="ac-show-title" className="acx-h2">
              {topic.solution.title}
            </h2>
          </div>
          <p className="acx-show__lead">{topic.solution.text}</p>
        </div>
        <div data-reveal>
          <FeatureExplorer topic={topic.slug} features={topic.features} />
        </div>
      </div>
    </section>
  );
}
