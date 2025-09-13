export type Room = {
  _id?: string;
  roomNumber: number;
  floorNumber: number;
  indexOnFloor: number;
  isBooked: boolean;
};

type Props = {
  room: Room;
  highlighted?: boolean;
};

export default function RoomCard({ room, highlighted }: Props) {
  const { roomNumber, isBooked } = room;
  const color = highlighted
    ? "bg-yellow-200 dark:bg-yellow-500/40 animate-highlight"
    : isBooked
      ? "bg-red-200 dark:bg-red-500/30"
      : "bg-green-200 dark:bg-green-500/30";

  return (
    <div
      className={`h-8 w-8 md:h-10 md:w-10 rounded-sm ${color} border border-gray-300 dark:border-gray-600 grid place-items-center text-xs md:text-sm text-gray-900 dark:text-gray-100 select-none transition-transform hover:scale-105 focus:scale-105`}
      title={`Room ${roomNumber}${isBooked ? " (booked)" : " (available)"}`}
      aria-label={`Room ${roomNumber} ${isBooked ? "booked" : "available"}`}
    >
      {roomNumber}
    </div>
  );
}
