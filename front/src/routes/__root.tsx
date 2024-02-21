import { Outlet, Link as RouteLink, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HStack, VStack } from "styled-system/jsx";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

export const Route = createRootRoute({
  component: () => (
    <>
      <VStack gap="20">
        <Heading size={"4xl"}>Ai Housing</Heading>
        <Text paddingX={"30%"}>
          Ai housing est un outil de recherche de logement par intelligence artificielle. Veuillez entrez la description
          de votre logement de rêve pour commencer.
        </Text>
        <HStack
          w="100%"
          paddingX="30%"
          justify={"space-between"}
          pos={"sticky"}
          bg={"bg.canvas"}
          top="0"
          zIndex={"2"}
          paddingY={"10px"}
        >
          <Link asChild _status={{ fontWeight: "bold" }}>
            <RouteLink to="/">Recherche par texte</RouteLink>
          </Link>
          <Link asChild _status={{ fontWeight: "bold" }}>
            <RouteLink to="/searchByPicture">Recherche par image</RouteLink>
          </Link>
        </HStack>
        <Outlet />
      </VStack>

      <TanStackRouterDevtools />
    </>
  ),
});
