import { useState, type KeyboardEvent } from "react";

type Props = {
  onBook: (requested: number) => void;
  onRandomize: (percent?: number) => void;
  onReset: () => void;
  isBooking?: boolean;
  isRandomizing?: boolean;
  isResetting?: boolean;
};

export default function Controls({ onBook, onRandomize, onReset, isBooking = false, isRandomizing = false, isResetting = false }: Props) {
  const [requested, setRequested] = useState<number>(1);
  const [percent, setPercent] = useState<number>(30);

  const clampRequested = (n: number) => Math.min(5, Math.max(1, n));
  const isRequestedValid = requested >= 1 && requested <= 5;

  const handleRequestedKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setRequested((v) => clampRequested(v - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setRequested((v) => clampRequested(v + 1));
    } else if (/^[1-5]$/.test(e.key)) {
      setRequested(Number(e.key));
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col">
          <span id="requested-label" className="text-sm font-medium text-gray-700 dark:text-gray-200">Rooms to book</span>
          <div
            role="radiogroup"
            aria-labelledby="requested-label"
            onKeyDown={handleRequestedKeyDown}
            title="Tip: Use 1–5 or ←/→ keys"
            tabIndex={0}
            className="mt-1 inline-flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden select-none"
          >
            {[1, 2, 3, 4, 5].map((n, idx) => {
              const selected = requested === n;
              const common = "h-10 w-10 inline-flex items-center justify-center text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0";
              const separator = idx === 0 ? "" : "border-l border-gray-300 dark:border-gray-600";
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={`${n} room${n>1?'s':''}`}
                  onClick={() => setRequested(n)}
                  className={`${common} ${separator} ${selected ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400" id="requested-help">Quick pick: 1–5 rooms.</div>
          <button
            onClick={() => onBook(clampRequested(requested))}
            disabled={isBooking || !isRequestedValid}
            aria-busy={isBooking}
            className={`mt-3 inline-flex items-center justify-center rounded-md px-4 h-11 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-white ${isBooking || !isRequestedValid ? 'bg-primary-400 cursor-not-allowed opacity-80' : 'bg-primary-600 hover:bg-primary-700'}`}
          >
            {isBooking ? (
              <>
                <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Booking…
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/>
                  <path d="m9 14 2 2 4-4"/>
                </svg>
                Book Rooms
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Randomize Occupancy</span>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="percent"
              type="range"
              min={0}
              max={100}
              step={5}
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-full accent-primary-600"
              aria-label="Randomize occupancy percentage"
            />
            <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 text-sm font-medium border border-primary-200 dark:border-primary-800 select-none">
              {percent}%
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2" aria-label="Quick presets">
            {[0, 25, 50, 75, 100].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPercent(p)}
                className={`px-2.5 py-1 rounded-full text-xs border ${percent === p ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border-primary-200 dark:border-primary-800' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                aria-pressed={percent === p}
              >
                {p}%
              </button>
            ))}
          </div>
          <button
            onClick={() => onRandomize(Math.min(100, Math.max(0, percent)))}
            disabled={isRandomizing}
            aria-busy={isRandomizing}
            className={`mt-3 inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 h-11 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isRandomizing ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            {isRandomizing ? (
              <>
                <span className="mr-2 h-4 w-4 rounded-full border-2 border-gray-700 border-t-transparent animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>
                </svg>
                Generate Random Occupancy
              </>
            )}
          </button>
        </div>

        <div className="flex items-end">
          <button
            onClick={onReset}
            disabled={isResetting}
            aria-busy={isResetting}
            className={`w-full inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isResetting ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            {isResetting ? (
              <>
                <span className="mr-2 h-4 w-4 rounded-full border-2 border-gray-700 border-t-transparent animate-spin" />
                Resetting…
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-3-6.7"/>
                  <path d="M21 3v6h-6"/>
                </svg>
                Reset Bookings
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
