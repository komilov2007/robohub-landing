// Mavzu sahifasi yuklanayotgandagi App Shell: hero joylashuvi yumshoq "skelet" bloklar bilan.
// Sahifalar orasida o'tishda bir lahza ko'rinadi (params <Suspense> ichida o'qiladi).
export default function TopicSkeleton() {
  return (
    <section className="ac-th" aria-busy="true" aria-label="Yuklanmoqda">
      <div className="ac-wrap">
        <span className="ac-skel ac-skel--crumbs" />
        <span className="ac-skel ac-skel--name" />
        <div className="ac-th__grid">
          <div>
            <span className="ac-skel ac-skel--line" />
            <span className="ac-skel ac-skel--line ac-skel--short" />
          </div>
          <span className="ac-skel ac-skel--video" />
        </div>
      </div>
    </section>
  );
}
