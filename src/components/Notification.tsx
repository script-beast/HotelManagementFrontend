import { useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

export default function Notification({ message, type = "info", onClose, duration = 2000 }: Props) {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  console.log(message)

  const color = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-800";

  return (
    <div className={`fixed bottom-6 right-6 text-white px-4 py-2 rounded-md shadow-lg ${color}`}
      role="status" aria-live="polite">
      {message}
    </div>
  );
}
