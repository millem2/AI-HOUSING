import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as Carousel from "~/components/ui/carousel";
import { IconButton } from "~/components/ui/icon-button";

type AnnonceImagesProps = Carousel.RootProps & {
  images: string[];
};

export const AnnonceImages = (props: AnnonceImagesProps) => {
  return (
    <Carousel.Root {...props}>
      <Carousel.Viewport>
        <Carousel.ItemGroup>
          {props.images.map((image, index) => (
            <Carousel.Item key={index} index={index}>
              <img src={image} alt={`Slide ${index}`} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control>
          <Carousel.PrevTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Previous Slide" left={"-0.5"}>
              <ChevronLeftIcon />
            </IconButton>
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            {props.images.map((_, index) => (
              <Carousel.Indicator key={index} index={index} aria-label={`Goto slide ${index + 1}`} />
            ))}
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Next Slide">
              <ChevronRightIcon />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Viewport>
    </Carousel.Root>
  );
};
