import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTest = () => {
  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/");
      return response.json();
    },
  });

  return query;
};

export interface IResult {
  index: number;
  title: string;
  url: string;
  description: string;
  photos: string;
  price: number;
  location: string;
  surface: number;
  rooms: number;
  cosine_similarity: number;
}

export const useSearchbyText = () => {
  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (inputs: { description: string }) => {
      const response = await fetch(`http://127.0.0.1:8000/housingFromText?label=${inputs.description}`, {
        method: "POST",
        body: JSON.stringify({
          label: inputs.description,
        }),
      });

      console.log("response", response);
      const JSONstring = await response.json();
      const JSONresponse: IResult = JSON.parse(JSONstring);

      console.log("JSON response", JSONresponse);
      // console.log("JSON response length", JSONresponse.?length);

      return JSONresponse;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["searchByText", { description: variables.description }], data);
    },
  });

  return mutation;
};
