type Props = {
  name?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
};

export default function Header({ name = "Your Name", resumeUrl = "#", portfolioUrl = "#" }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 supports-[backdrop-filter]:dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hotel Room Reservation System</h1>
          <p className="text-gray-600 dark:text-gray-300">Developed by {name}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md bg-primary-600 text-white px-4 py-2 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm"
          >
            Resume
          </a>
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm"
          >
            Portfolio
          </a>
        </div>
      </div>
    </header>
  );
}
