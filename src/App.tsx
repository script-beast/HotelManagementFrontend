import { useEffect, useMemo, useState } from "react";
import type { Room } from "./components/RoomCard";
import Header from "./components/Header";
import Controls from "./components/Controls";
import HotelGrid from "./components/HotelGrid";
import Notification from "./components/Notification";
import { book, getStatus, randomize, reset } from "./lib/api";

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [highlighted, setHighlighted] = useState<Set<string | number>>(
    new Set()
  );
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [randomizing, setRandomizing] = useState(false);
  const [resetting, setResetting] = useState(false);

  const highlightedIds = useMemo(() => highlighted, [highlighted]);

  const refresh = async () => {
    const data = await getStatus();
    setRooms(data);
  };

  useEffect(() => {
    refresh().catch((err) => setToast({ message: err.message, type: "error" }));
  }, []);

  const handleBook = async (requested: number) => {
    try {
      setLoading(true);
      setBooking(true);
      const res = await book(requested);
      setHighlighted(new Set(res.allocated.map((r) => r._id ?? r.roomNumber)));
      setToast({
        message: `Allocated rooms: ${res.allocated
          .map((r) => r.roomNumber)
          .join(", ")} — Travel time: ${res.travelTime} min`,
        type: "success",
      });
      await refresh();
      setTimeout(() => setHighlighted(new Set()), 2000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Booking failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
      setBooking(false);
    }
  };

  const handleRandomize = async (percent?: number) => {
    try {
      setLoading(true);
      setRandomizing(true);
      await randomize(percent);
      await refresh();
      setToast({ message: "Random occupancy generated", type: "info" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Randomize failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
      setRandomizing(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      setResetting(true);
      await reset();
      await refresh();
      setToast({ message: "Bookings reset", type: "info" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Reset failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        name="Your Name"
        resumeUrl="https://drive.google.com/file/d/1RPl2q2H_7Q29lzslFfl5DuJUlwFLG3iQ/view?usp=drive_link"
        portfolioUrl="https://aprajapati.vercel.app/"
      />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Controls</h2>
            {loading && <span className="text-sm text-gray-500">Loading…</span>}
          </div>
          <Controls
            onBook={handleBook}
            onRandomize={handleRandomize}
            onReset={handleReset}
            isBooking={booking}
            isRandomizing={randomizing}
            isResetting={resetting}
          />

          <div className="flex items-center justify-between mt-2">
            <h2 className="text-lg font-medium">Hotel</h2>
          </div>
          <div className="flex-1 min-h-0">
            <HotelGrid rooms={rooms} highlightedIds={highlightedIds} />
          </div>
        </div>
      </main>

      {toast && (
        <Notification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
