import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Layers,
  Flame,
  Compass,
  Sparkles,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Award,
  GraduationCap,
  SlidersHorizontal,
  Check,
  Coffee,
  Heart,
  Smile,
} from "lucide-react";
import { ChapterId, Difficulty, SourceCategory, SolvedProblem } from "../types";
import { CHAPTERS, getProblemsByChapter } from "../data";
import { ProblemCard } from "../components/ProblemCard";
import { fa } from "../components/Math";

interface ProblemsViewProps {
  progress: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  onToggleProgress: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  activeChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
}

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

// Custom warm styled popover dropdown
function CustomFilterDropdown({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
  icon: React.ElementType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[11px] font-bold text-soft mb-1.5">{label}:</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold text-ink transition-all cursor-pointer shadow-xs ${
          isOpen
            ? "border-orange-500 bg-card2 ring-2 ring-orange-500/20"
            : "border-line bg-card hover:bg-card2 hover:border-orange-500/40"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          <Icon size={14} className="text-orange-500 shrink-0" />
          <span className="truncate">{selectedOption.label}</span>
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-soft transition-transform duration-200 ${
            isOpen ? "rotate-180 text-orange-500" : ""
          }`}
        />
      </button>

      {/* Floating Popover Menu with Warm Personality */}
      {isOpen && (
        <div className="absolute top-full start-0 z-30 mt-1.5 w-full min-w-[240px] rounded-2xl border border-line bg-card p-1.5 shadow-xl space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-orange-500/15 to-amber-500/10 text-orange-600 dark:text-orange-300 font-black"
                    : "text-soft hover:bg-card2 hover:text-ink"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate">{opt.label}</p>
                  {opt.description && (
                    <p className="text-[10px] text-faint truncate font-medium mt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
                {isSelected && <Check size={14} className="text-orange-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const ProblemsView: React.FC<ProblemsViewProps> = ({
  progress,
  bookmarks,
  onToggleProgress,
  onToggleBookmark,
  activeChapter,
  onSelectChapter,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>("all");
  const [selectedSourceCategory, setSelectedSourceCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const chapterInfo = useMemo(
    () => CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0],
    [activeChapter]
  );

  const rawProblems = useMemo(
    () => getProblemsByChapter(activeChapter),
    [activeChapter]
  );

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return rawProblems.filter((p) => {
      if (selectedDifficulty !== "all" && p.difficulty !== selectedDifficulty) return false;
      if (selectedSubTopic !== "all" && p.subTopic !== selectedSubTopic) return false;
      if (selectedSourceCategory !== "all" && p.sourceCategory !== selectedSourceCategory) return false;
      if (selectedStatus === "solved" && !progress[p.id]) return false;
      if (selectedStatus === "bookmarked" && !bookmarks[p.id]) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSource = p.source.toLowerCase().includes(query);
        const matchesStatement = p.statement.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSource && !matchesStatement) return false;
      }
      return true;
    });
  }, [
    rawProblems,
    selectedDifficulty,
    selectedSubTopic,
    selectedSourceCategory,
    selectedStatus,
    searchQuery,
    progress,
    bookmarks,
  ]);

  // Statistics
  const solvedInChapter = rawProblems.filter((p) => progress[p.id]).length;
  const bookmarkedInChapter = rawProblems.filter((p) => bookmarks[p.id]).length;
  const completionPercent = Math.round((solvedInChapter / rawProblems.length) * 100);

  const handleResetFilters = () => {
    setSelectedDifficulty("all");
    setSelectedSubTopic("all");
    setSelectedSourceCategory("all");
    setSelectedStatus("all");
    setSearchQuery("");
  };

  const difficultyOptions: DropdownOption[] = [
    { value: "all", label: "همه سطوح دشواری", description: "آسان، متوسط و سخت" },
    { value: "easy", label: "سطح آسان و روان", description: "مسائل مقدماتی و امتحانی ساده" },
    { value: "medium", label: "سطح متوسط و کاربردی", description: "استاندارد امتحانات دانشگاهی" },
    { value: "hard", label: "سطح چالشی و جذاب", description: "کنکور کارشناسی ارشد و مسائل پیشرفته" },
  ];

  const sourceCategoryOptions: DropdownOption[] = [
    { value: "all", label: "همه مراجع و آزمون‌ها", description: "دانشگاه‌های برتر، کنکور ارشد و کتب مرجع" },
    { value: "university_exam", label: "امتحانات دانشگاه‌های برتر", description: "شریف، تهران، امیرکبیر، علم و صنعت..." },
    { value: "konkur_arshad", label: "کنکور کارشناسی ارشد", description: "مهندسی برق، مکانیک و عمران" },
    { value: "textbook", label: "کتب مرجع دانشگاهی", description: "دکتر شیدفر، معتقدی، کریزیگ، چرچیل" },
  ];

  const statusOptions: DropdownOption[] = [
    { value: "all", label: "همه مسائل فصل", description: "نمایش تمام مسائل موجود" },
    { value: "solved", label: "فقط مسائل حل‌شده", description: "مسائل با تیک سبز حل" },
    { value: "bookmarked", label: "فقط مسائل نشان‌شده", description: "مسائل ذخیره‌شده در نشان‌ها" },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Friendly Warm Hero Greeting Pill */}
      <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-orange-500/08 to-rose-500/05 p-3.5 sm:p-4 text-xs font-bold text-ink flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xs">
            <Coffee size={14} />
          </span>
          <span className="text-soft">
            <strong className="text-ink font-black">سلام دوست مهندس!</strong> یک فنجان چای یا قهوه بنوش و با گام‌های روشن، گره مسائل سخت رو باز کن.
          </span>
        </div>

        <div className="flex items-center gap-2 ms-auto">
          <span className="rounded-full bg-card/80 border border-line px-2.5 py-0.5 text-[11px] text-soft">
            {fa(rawProblems.length)} مسئله تشریحی گام‌به‌گام
          </span>
        </div>
      </div>

      {/* Playful & Charming Chapter Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;

          const chapterStyles: Record<
            ChapterId,
            { iconBg: string; activeBorder: string; activeGlow: string }
          > = {
            fourier: {
              iconBg: "from-amber-500 to-orange-500",
              activeBorder: "border-orange-500/60 bg-gradient-to-br from-amber-500/15 via-orange-500/05 to-transparent",
              activeGlow: "via-orange-500",
            },
            pde: {
              iconBg: "from-orange-500 to-rose-500",
              activeBorder: "border-rose-500/60 bg-gradient-to-br from-rose-500/15 via-orange-500/05 to-transparent",
              activeGlow: "via-rose-500",
            },
            complex: {
              iconBg: "from-emerald-500 to-teal-600",
              activeBorder: "border-emerald-500/60 bg-gradient-to-br from-emerald-500/15 via-teal-500/05 to-transparent",
              activeGlow: "via-emerald-500",
            },
          };

          const s = chapterStyles[ch.id];

          return (
            <button
              key={ch.id}
              onClick={() => {
                onSelectChapter(ch.id);
                setSelectedSubTopic("all");
              }}
              className={`relative overflow-hidden p-4 sm:p-4.5 rounded-2xl border text-start transition-all cursor-pointer ${
                isActive
                  ? `${s.activeBorder} text-ink shadow-sm scale-[1.01]`
                  : "border-line bg-card hover:bg-card2 text-soft hover:text-ink shadow-xs"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent ${s.activeGlow} to-transparent`}
                />
              )}
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-white text-xs font-black shadow-xs bg-gradient-to-br ${s.iconBg}`}
                >
                  {ch.id === "fourier" ? <Layers size={17} /> : ch.id === "pde" ? <Flame size={17} /> : <Compass size={17} />}
                </span>
                <span className="text-[11px] font-bold text-faint bg-card2 px-2 py-0.5 rounded-full border border-line">
                  فصل {fa(ch.number)}
                </span>
              </div>
              <h2 className="text-base font-black text-ink tracking-tight">{ch.title}</h2>
              <p className="text-xs text-soft font-medium mt-1 line-clamp-1">{ch.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Chapter Overview & Cheerful Progress Bar */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-300 px-3 py-0.5 text-xs font-bold">
                بانک حل‌المسائل تشریحی
              </span>
              <span className="text-xs text-soft font-medium">
                {fa(rawProblems.length)} مسئله استاندارد مقطع کارشناسی
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
              {chapterInfo.title} ({chapterInfo.englishTitle})
            </h1>
            <p className="text-xs sm:text-sm text-soft font-medium mt-1.5 max-w-3xl leading-6">
              {chapterInfo.description}
            </p>
          </div>

          {/* Cheerful Stats Chips */}
          <div className="flex flex-wrap items-center gap-2 ms-auto">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card2 px-3 py-1.5 text-xs font-bold text-ink shadow-xs">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{fa(solvedInChapter)} حل‌شده</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card2 px-3 py-1.5 text-xs font-bold text-ink shadow-xs">
              <Bookmark size={14} className="text-amber-500 fill-amber-400" />
              <span>{fa(bookmarkedInChapter)} نشان‌شده</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-300 shadow-xs">
              <span>{fa(completionPercent)}٪ تکمیل فصل</span>
            </span>
          </div>
        </div>

        {/* Cheerful Warm Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-2.5 rounded-full bg-card2 border border-line overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-amber-400 via-orange-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar with Warm Styling */}
      <div className="rounded-2xl border border-line bg-card p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search & Reset */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="جستجو در متن سوالات، عنوان، یا دانشگاه/مرجع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-line bg-card2 py-2.5 ps-9 pe-3 text-xs sm:text-sm font-medium text-ink placeholder:text-faint focus:outline-hidden focus:border-orange-500 focus:bg-card transition-all"
            />
          </div>

          <button
            onClick={handleResetFilters}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-line bg-card2 hover:bg-card px-3.5 py-2.5 text-xs font-bold text-soft hover:text-ink shadow-xs transition-all active:scale-95"
            title="پاک کردن فیلترها"
          >
            <RotateCcw size={13} />
            <span>ریست فیلترها</span>
          </button>
        </div>

        {/* Subtopic Filters with Warm Glowing Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-soft shrink-0 flex items-center gap-1 pe-1">
            <Filter size={13} />
            مبحث:
          </span>
          {chapterInfo.subTopics.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedSubTopic(st.id)}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedSubTopic === st.id
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xs font-black"
                  : "border border-line bg-card text-soft hover:text-ink hover:bg-card2"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Custom Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-line">
          <CustomFilterDropdown
            label="سطح دشواری"
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
            options={difficultyOptions}
            icon={SlidersHorizontal}
          />

          <CustomFilterDropdown
            label="دسته‌بندی مرجع و منبع"
            value={selectedSourceCategory}
            onChange={setSelectedSourceCategory}
            options={sourceCategoryOptions}
            icon={Award}
          />

          <CustomFilterDropdown
            label="وضعیت مطالعه"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={statusOptions}
            icon={CheckCircle2}
          />
        </div>
      </div>

      {/* Problem Cards Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-soft px-1">
          <span className="flex items-center gap-1">
            <Sparkles size={13} className="text-amber-500" />
            نمایش {fa(filteredProblems.length)} مسئله منطبق
          </span>
          <span>فصل {chapterInfo.title}</span>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card p-12 text-center shadow-sm space-y-3">
            <BookOpen size={36} className="mx-auto text-faint" />
            <h3 className="text-base font-black text-ink">مسئله‌ای با این فیلترها یافت نشد</h3>
            <p className="text-xs text-soft max-w-sm mx-auto leading-6">
              لطفاً فیلترهای جستجو، مبحث یا سطح دشواری را تغییر دهید یا دکمه «ریست فیلترها» را بزنید.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 text-xs font-bold shadow-xs cursor-pointer hover:opacity-90 transition-all"
            >
              پاک کردن همه فیلترها
            </button>
          </div>
        ) : (
          filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              isSolved={!!progress[problem.id]}
              isBookmarked={!!bookmarks[problem.id]}
              onToggleSolved={onToggleProgress}
              onToggleBookmarked={onToggleBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
};
