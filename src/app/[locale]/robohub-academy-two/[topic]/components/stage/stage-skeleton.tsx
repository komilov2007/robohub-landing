import Aurora from "../../../components/aurora/aurora";

// Mavzu sahifasi yuklanayotgandagi ko'rinish (App Shell): aurora hero, chapda sarlavha, o'ngda pleyer o'rnida
// yaltiroq "skelet" bloklar. Sahifalar orasida o'tishda bir lahza ko'rinadi.
export default function StageSkeleton() {
  return (
    <section className="acx-hero acx-hero--topic" data-theme="dark" aria-busy="true" aria-label="Yuklanmoqda">
      <Aurora />
      <div className="container acx-thero">
        <div className="acx-thero__text">
          <span className="acx-skel acx-skel--pill" />
          <span className="acx-skel acx-skel--title" />
          <span className="acx-skel acx-skel--title acx-skel--short" />
          <span className="acx-skel acx-skel--lead" />
          <span className="acx-skel acx-skel--card" />
        </div>
        <div className="acx-thero__media">
          <div className="acx-screen">
            <span className="acx-skel acx-skel--video" />
          </div>
        </div>
      </div>
    </section>
  );
}
