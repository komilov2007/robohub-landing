// Mavzu sahifasi yuklanayotgandagi ko'rinish (App Shell): to'q hero foni, sarlavha va pleyer o'rnida
// yumshoq "skelet" bloklar. Sahifalar orasida o'tishda bir lahza ko'rinadi.
export default function StageSkeleton() {
  return (
    <section className="ac-stage" data-theme="dark" aria-busy="true" aria-label="Yuklanmoqda">
      <div className="container">
        <div className="ac-stage__head">
          <span className="ac-skel ac-skel--pill" />
          <span className="ac-skel ac-skel--title" />
          <span className="ac-skel ac-skel--title ac-skel--short" />
          <span className="ac-skel ac-skel--lead" />
        </div>
        <div className="ac-stage__media">
          <div className="ac-screen">
            <span className="ac-skel ac-skel--video" />
          </div>
        </div>
      </div>
    </section>
  );
}
