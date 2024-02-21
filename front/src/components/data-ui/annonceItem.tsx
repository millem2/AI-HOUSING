import { VStack } from "styled-system/jsx";
import { IResult } from "~/features/searchByText";
import * as Card from "../ui/card";
import { Link } from "../ui/link";
import { Text } from "../ui/text";
import { AnnonceImages } from "./annonceImages";

type AnnonceItemProps = Card.RootProps & {
  annonce: IResult;
};

export const AnnonceItem = (props: AnnonceItemProps) => {
  const images = JSON.parse(props.annonce.photos.replace(/'/g, '"')).filter(
    (photo: string | null) => photo !== null
  ) as string[];

  return (
    <Card.Root width={"100%"} {...props} flexDir={"row"} padding={"3"}>
      <AnnonceImages images={images} size={"md"} maxW={"350px"} flexShrink={0} />
      <VStack padding={0} justify={"start"} alignContent={"start"}>
        <Card.Header paddingY={0}>
          <Card.Title>{props.annonce.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Description>{props.annonce.description}</Card.Description>
          <Text mt="4">Similarité {(props.annonce.cosine_similarity * 100).toFixed(3)} %</Text>
          <Link mt="auto" href={props.annonce.url}>
            Voir l'annonce
          </Link>
        </Card.Body>
      </VStack>
    </Card.Root>
  );
};
