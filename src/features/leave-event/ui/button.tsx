import { trpc } from "@/shared/api";

type LeaveEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};
export const LeaveEventButtonProps = ({
  eventId,
  onSuccess,
}: LeaveEventButtonProps) => {
  const { mutate } = trpc.event.leave.useMutation({ onSuccess });
  const handleClick = () => {
    mutate({ id: eventId });
  };
  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-red-500 text-white"
      onClick={handleClick}
    >
      Покинуть
    </button>
  );
};
