import { HStack, Stack, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";

export const Home = () => {
  return (
    <VStack gap="20">
      <Heading size={"4xl"}>Ai Housing</Heading>
      <Text paddingX={"30%"}>
        Ai housing est un outil de recherche de logement par intelligence artificielle. Veuillez entrez la description
        de votre logement de rêve pour commencer.
      </Text>

      <form>
        <HStack alignItems={"flex-end"}>
          <Stack gap="1.5" width="2xs">
            <FormLabel htmlFor="description" fontWeight={"bold"}>
              Description
            </FormLabel>
            <Textarea id="description" rows={4} />
          </Stack>
          <Button type="submit">Rechercher</Button>
        </HStack>
      </form>
    </VStack>
  );
};
