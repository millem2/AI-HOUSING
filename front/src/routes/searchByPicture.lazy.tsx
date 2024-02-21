import { createLazyFileRoute } from "@tanstack/react-router";
import { PictureUpload } from "~/components/data-ui/pictureUpload";

export const Route = createLazyFileRoute("/searchByPicture")({
  component: SearchByPicture,
});

function SearchByPicture() {
  return <PictureUpload w={"lg"} />;
}
