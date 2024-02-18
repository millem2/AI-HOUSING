import pandas as pd
import tiktoken
from utils import get_embedding

# embedding model parameters
embedding_model = "text-embedding-3-small"
embedding_encoding = "cl100k_base"
max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191

# load & inspect dataset
input_datapath = "../data/finalDatas.json"
df = pd.read_json(input_datapath)
# df["combined"] = (
#     "Title: " + df.libelle.str.strip() + "; Presentation: " + df.presentation.str.strip()
# )
print(df.head())

# This may take a few minutes
df["embedding"] = df.description.apply(
    lambda x: get_embedding(x, model=embedding_model)
)
df.to_csv("./finalDatas_embeddings.csv")
df.to_excel("./finalDatas_embeddings.xlsx")
df.to_json("./finalDatas_embeddings.json")
