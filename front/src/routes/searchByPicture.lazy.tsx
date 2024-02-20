import { createLazyFileRoute } from "@tanstack/react-router";
import { Heading } from "~/components/ui/heading";

export const Route = createLazyFileRoute("/searchByPicture")({
  component: SearchByPicture,
});

function SearchByPicture() {
  return <Heading className="p-2">Hello from About!</Heading>;
}
