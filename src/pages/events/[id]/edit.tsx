import { CreateEventForm } from "@/features/create-event";
import { CreateEventSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EditEvent() {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: () => {
      router.push(`/events/${router.query.id}`);
    },
  });

  const handleSubmit = (data: CreateEventSchema) => {
    mutate({
      id: Number(router.query.id),
      ...data,
    });
  };

  const cancelHandler = () => {
    router.push(`/events/${router.query.id}`);
  };

  if (isLoading) {
    return "Loading...";
  }

  if (session.status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "No data";
  }

  return (
    <CreateEventForm
      onSubmit={handleSubmit}
      cancelHandler={cancelHandler}
      data={data}
      isEdit
    />
  );
}
