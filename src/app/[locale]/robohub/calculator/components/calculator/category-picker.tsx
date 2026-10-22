"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./i18n";
import { CIcon, Spinner } from "./ui";
import { getPublicCategories } from "./api";
import { fetchQuery, useDebounce, useQuery } from "./query";
import type { CalculatorMarketplace, CategoryPath, PublicCategory, SelectedCategory } from "./types";

// Mehmon uchun kategoriya tanlash — rb-market PublicCategoryDialog + usePublicCategoryDialog.
// Ochiq API butun daraxtni bermaydi: `parent_id` bilan bitta daraja yoki ≤30 barg qidiruvi. Shuning uchun
// har ochiq ustun o'z darajasini o'zi so'raydi; qidiruv natijasi esa ildizdan nomlar bo'yicha yechiladi.

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 400;

/** Zanjirdagi qadam. `id`/`has_children` — tanlanganda ma'lum; tiklangan zanjirda faqat bargniki. */
interface PathNode extends CategoryPath {
  id?: number;
  has_children?: boolean;
}

const levelKey = (marketplace: CalculatorMarketplace, parentId?: string) => ["public-categories", marketplace, parentId ?? ""];
const fetchLevel = (marketplace: CalculatorMarketplace, parentId?: string) =>
  fetchQuery(levelKey(marketplace, parentId), () =>
    getPublicCategories({ marketplace, ...(parentId ? { parent_id: parentId } : {}) }),
  );

const toSelected = (chain: CategoryPath[], id: number): SelectedCategory => ({
  id,
  full_path: chain.map((node) => node.name).join(" > "),
  path: chain.map(({ category_id, name }) => ({ category_id, name })),
});

/** Kalkulyatordagi kategoriya qatori: bargni oldinga qo'yadi (stavkani u belgilaydi), to'liq yo'l — title'da. */
export function CategoryField({
  marketplace,
  value,
  onChange,
}: {
  marketplace: CalculatorMarketplace;
  value: SelectedCategory | null;
  onChange: (next: SelectedCategory) => void;
}) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const leaf = value?.path[value.path.length - 1]?.name;
  const parents = value?.path.slice(0, -1).map((node) => node.name) ?? [];

  return (
    <div className="cc-field">
      <span className="cc-label">
        <span>{t("category")}</span>
      </span>
      <button
        type="button"
        className={"cc-input cc-select" + (leaf ? "" : " is-empty")}
        onClick={() => setOpen(true)}
        title={value?.full_path || undefined}
        aria-haspopup="dialog"
      >
        <span className="cc-select__value">
          {leaf ? (
            <>
              <b>{leaf}</b>
              {parents.length > 0 && <small> · {parents.join(" › ")}</small>}
            </>
          ) : (
            t("choose_category")
          )}
        </span>
        <CIcon name="chevron" className="cc-select__chev" />
      </button>
      {open && (
        <CategoryDialog
          marketplace={marketplace}
          initialPath={value?.path}
          initialId={value?.id}
          onClose={() => setOpen(false)}
          onSelect={onChange}
        />
      )}
    </div>
  );
}

/** Bitta ustun: `parentId` ning bolalari. */
function Column({
  marketplace,
  parentId,
  activeId,
  onPick,
}: {
  marketplace: CalculatorMarketplace;
  parentId?: string;
  activeId?: string;
  onPick: (row: PublicCategory) => void;
}) {
  const { t } = useT();
  const level = useQuery({
    key: levelKey(marketplace, parentId),
    fn: () => getPublicCategories({ marketplace, ...(parentId ? { parent_id: parentId } : {}) }),
  });

  if (!level.data) {
    return (
      <div className="cc-cols__col is-loading">
        {level.isError ? (
          <button type="button" className="cc-btn cc-btn--outline cc-btn--xs" onClick={level.refetch}>
            <CIcon name="repeat" />
            {t("retry")}
          </button>
        ) : (
          <Spinner size={20} />
        )}
      </div>
    );
  }

  return (
    <ul className="cc-cols__col">
      {level.data.map((row) => (
        <li key={row.id}>
          <button
            type="button"
            className={"cc-cols__item" + (row.category_id === activeId ? " is-active" : "")}
            aria-pressed={row.category_id === activeId}
            onClick={() => onPick(row)}
          >
            <span>{row.name}</span>
            {row.has_children ? <CIcon name="chevron" className="cc-cols__more" /> : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

function CategoryDialog({
  marketplace,
  initialPath,
  initialId,
  onClose,
  onSelect,
}: {
  marketplace: CalculatorMarketplace;
  initialPath?: CategoryPath[];
  initialId?: number;
  onClose: () => void;
  onSelect: (category: SelectedCategory) => void;
}) {
  const { t } = useT();
  const colsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [resolving, setResolving] = useState(false);
  /** Qidiruv natijasining zanjiri yechilmasa — o'zi qoladi, faqat sarlavhada ko'rinadi. */
  const [searchPick, setSearchPick] = useState<SelectedCategory | null>(null);
  const [path, setPath] = useState<PathNode[]>(() => {
    // Tiklanadigan zanjir — har qadamda marketpleysning o'z id'si bo'lsa; oxirgisi — tanlangan barg.
    if (!initialPath?.length || !initialPath.every((node) => node.category_id)) return [];
    return initialPath.map((node, i) =>
      i === initialPath.length - 1 ? { ...node, id: initialId, has_children: false } : { ...node, has_children: true },
    );
  });

  const leaf = path[path.length - 1];
  const showNextColumn = !leaf || leaf.has_children !== false;
  const selected = searchPick ?? (leaf && leaf.has_children === false && leaf.id ? toSelected(path, leaf.id) : null);

  const query = search.trim();
  const debounced = useDebounce(query.length >= MIN_QUERY_LENGTH ? query : "", SEARCH_DEBOUNCE_MS);
  const results = useQuery({
    enabled: !!debounced,
    key: ["public-categories-search", marketplace, debounced],
    fn: () => getPublicCategories({ marketplace, search: debounced }),
  });

  // Esc yopadi, sahifa orqada aylanmaydi
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("as-lock");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("as-lock");
    };
  }, [onClose]);

  // Yangi ustun ochilganda — u ko'rinadigan joyga suriladi
  useEffect(() => {
    const el = colsRef.current;
    if (el && path.length) requestAnimationFrame(() => el.scrollTo({ left: el.scrollWidth, behavior: "smooth" }));
  }, [path]);

  const pick = (row: PublicCategory, level: number) => {
    setSearchPick(null);
    setPath([...path.slice(0, level), { category_id: row.category_id, name: row.name, id: row.id, has_children: row.has_children }]);
  };

  /** Qidiruv natijasi ajdodlarini nomi bilan beradi, id'siz — zanjir ildizdan nomlar bo'yicha yechiladi. */
  const pickSearch = async (row: PublicCategory) => {
    const names = row.path ?? [row.name];
    setSearch("");
    setFocus(false);
    setResolving(true);
    const chain: PathNode[] = [];
    let parentId: string | undefined;
    try {
      for (const name of names) {
        const node = (await fetchLevel(marketplace, parentId)).find((candidate) => candidate.name === name);
        if (!node) break;
        chain.push({ category_id: node.category_id, name: node.name, id: node.id, has_children: node.has_children });
        parentId = node.category_id;
      }
    } catch {
      chain.length = 0;
    }
    const resolved = chain.length === names.length && chain[chain.length - 1]?.id === row.id;
    if (resolved) {
      setSearchPick(null);
      setPath(chain);
    } else {
      setSearchPick(toSelected(names.map((name) => ({ category_id: "", name })), row.id));
    }
    setResolving(false);
  };

  const confirm = () => {
    if (selected) onSelect(selected);
    onClose();
  };

  const columns = [undefined, ...path.map((node) => node.category_id)].slice(0, showNextColumn ? undefined : path.length);

  return (
    <div className="cc-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cc-modal__card" role="dialog" aria-modal="true" aria-labelledby="cc-cat-title">
        <header className="cc-modal__head">
          <div>
            <h3 id="cc-cat-title">{t("select_category")}</h3>
            <p>{t("category_dialog_subtitle")}</p>
          </div>
          <button type="button" className="cc-iconbtn" aria-label={t("cancel")} onClick={onClose}>
            <CIcon name="closeSimple" />
          </button>
        </header>

        <div className="cc-modal__body">
          {selected && <p className="cc-modal__picked">{selected.full_path}</p>}
          <div className="cc-search">
            <div className="cc-input">
              <CIcon name="search" className="cc-search__ico" />
              <input
                value={search}
                autoFocus
                autoComplete="off"
                placeholder={t("enter_category_or_subcategory")}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setFocus(true);
                }}
                onFocus={() => setFocus(true)}
                // Natija bosilishidan oldin blur bo'ladi — ro'yxat onMouseDown ulgurishi uchun biroz yashaydi
                onBlur={() => setTimeout(() => setFocus(false), 150)}
                aria-label={t("enter_category_or_subcategory")}
              />
              {results.isFetching && <Spinner size={14} />}
            </div>
            {focus && query.length > 0 && (
              <ul className="cc-search__list">
                {results.data?.length ? (
                  results.data.map((row) => (
                    <li key={row.id}>
                      <button type="button" onMouseDown={() => void pickSearch(row)}>
                        {(row.path ?? [row.name]).join(" › ")}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="cc-search__empty">
                    {results.isFetching || query.length < MIN_QUERY_LENGTH ? "…" : t("no_results")}
                  </li>
                )}
              </ul>
            )}
          </div>

          {resolving ? (
            <div className="cc-cols cc-cols--loading">
              <Spinner size={22} />
            </div>
          ) : (
            <div className="cc-cols" ref={colsRef}>
              {columns.map((parentId, level) => (
                <Column
                  key={`${level}-${parentId ?? "root"}`}
                  marketplace={marketplace}
                  parentId={parentId}
                  activeId={path[level]?.category_id}
                  onPick={(row) => pick(row, level)}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="cc-modal__foot">
          {path.length > 0 && !selected && <span className="cc-note">{t("category_dialog_pick_leaf")}</span>}
          <button type="button" className="cc-btn cc-btn--ghost cc-btn--sm" onClick={onClose}>
            {t("cancel")}
          </button>
          <button type="button" className="cc-btn cc-btn--primary cc-btn--sm" disabled={!selected} onClick={confirm}>
            {t("select")}
          </button>
        </footer>
      </div>
    </div>
  );
}
