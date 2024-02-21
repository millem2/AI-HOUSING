import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResult } from "./searchByText";

export const useSearchByPicure = () => {
  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (inputs: { picture: File[] }) => {
      const formData = new FormData();
      formData.append("file", inputs.picture[0]);

      const response = await fetch(`http://127.0.0.1:8000/housingFromImage`, {
        method: "POST",
        body: formData,
      });

      console.log("response", response);
      const JSONstring = await response.json();
      const JSONresponse: IResult = JSON.parse(JSONstring);

      console.log("JSON response", JSONresponse);

      return JSONresponse;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["searchByPicture", { picture: variables.picture }], data);
    },
  });

  return mutation;
};
