import { EventCard } from "@/entities/event";
import { JoinEventButton } from "@/features/join-event";
import { trpc } from "@/shared/api";
import { LeaveEventButtonProps } from "@/features/leave-event";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery();
  const { status } = useSession();

  return (
    <>
      <div className="flex justify-end mb-3">
        {status === "unauthenticated" ? (
          <Link
            className="h-10 px-6 font-semibold rounded-md bg-green-600 text-white align-middle leading-10"
            href="/api/auth/signin"
          >
            Войти
          </Link>
        ) : (
          <Link
            className="h-10 px-6 font-semibold rounded-md bg-red-600 text-white align-middle leading-10"
            href="/api/auth/signout"
          >
            Выйти
          </Link>
        )}
      </div>
      <ul>
        {data?.map((event) => (
          <li key={event.id} className="mb-6">
            <EventCard
              {...event}
              action={
                !event.isJoined ? (
                  <JoinEventButton eventId={event.id} onSuccess={refetch} />
                ) : (
                  <LeaveEventButtonProps
                    eventId={event.id}
                    onSuccess={refetch}
                  />
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
