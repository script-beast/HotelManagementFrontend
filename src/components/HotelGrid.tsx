import RoomCard, { type Room } from "./RoomCard";

type Props = {
  rooms: Room[];
  highlightedIds?: Set<string | number>;
};

export default function HotelGrid({ rooms, highlightedIds }: Props) {
  const floors = Array.from({ length: 10 }, (_, i) => i + 1);
  const roomsByFloor: Record<number, Room[]> = {};
  for (const f of floors) roomsByFloor[f] = [];
  const list = Array.isArray(rooms) ? rooms : [];
  for (const r of list) {
    const f = Number(r.floorNumber);
    if (!Number.isInteger(f) || f < 1 || f > 10) continue;
    roomsByFloor[f].push(r);
  }
  for (const f of floors) roomsByFloor[f].sort((a, b) => a.indexOnFloor - b.indexOnFloor);

  // Display Floor 10 at top descending to 1
  const displayFloors = [...floors].reverse();

  return (
    <section className="mt-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm">
      <div className=" overflow-auto pr-2">
        <div className="space-y-2">
          {displayFloors.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-14 text-xs md:text-sm text-gray-600 dark:text-gray-300 shrink-0">Floor {f}</div>
              <div className="grid grid-cols-10 gap-2">
                {roomsByFloor[f].map((room) => (
                  <RoomCard
                    key={room._id ?? room.roomNumber}
                    room={room}
                    highlighted={highlightedIds?.has(room._id ?? room.roomNumber)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
