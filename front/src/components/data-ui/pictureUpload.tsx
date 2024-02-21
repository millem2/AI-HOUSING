import { Trash2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";
import * as FileUpload from "~/components/ui/file-upload";
import { IconButton } from "~/components/ui/icon-button";

export const PictureUpload = (props: FileUpload.RootProps) => {
  return (
    <FileUpload.Root maxFiles={1} accept={"image/png, image/jpeg"} {...props}>
      <FileUpload.Dropzone>
        <FileUpload.Label>Glissez votre image ici</FileUpload.Label>
        <FileUpload.Trigger asChild>
          <Button size="sm">Ouvrir explorateur</Button>
        </FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        {(files) =>
          files.map((file, id) => (
            <FileUpload.Item key={id} file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger asChild>
                <IconButton variant="link" size="sm">
                  <Trash2Icon />
                </IconButton>
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
};
