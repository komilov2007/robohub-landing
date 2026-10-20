import Aurora from "../../../components/aurora/aurora";

// Mavzu sahifasi yuklanayotgandagi ko'rinish (App Shell): aurora hero, sarlavha, pleyer va pleylist o'rnida
// yaltiroq "skelet" bloklar. Sahifalar orasida o'tishda bir lahza ko'rinadi.
export default function StageSkeleton() {
  return (
    <section className="acx-hero acx-hero--topic" data-theme="dark" aria-busy="true" aria-label="Yuklanmoqda">
      <Aurora />
      <div className="container">
        <span className="acx-skel acx-skel--title" />
        <div className="acx-watch">
          <div className="acx-watch__main">
            <div className="acx-screen">
              <span className="acx-skel acx-skel--video" />
            </div>
          </div>
          <div className="acx-pl">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="acx-skel acx-skel--row" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
