import pandas as pd
import tiktoken
import numpy as np
from utils import get_cosinus_diference, get_embedding
import ast

# embedding model parameters
embedding_model = "text-embedding-3-small"
embedding_encoding = "cl100k_base"
max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191

# load & inspect dataset
input_datapath = "../data/Export_SeLoger_20240209.csv"
df = pd.read_csv(input_datapath, index_col=0)
# df["combined"] = (
#     "Title: " + df.libelle.str.strip() + "; Presentation: " + df.presentation.str.strip()
# )
print(df.head())

# This may take a few minutes
df["embedding"] = df.short_description.apply(
    lambda x: get_embedding(x, model=embedding_model)
)

## Save the embeddings
df.to_csv("./se_loger_embeddings.csv")
df.to_excel("./se_loger_embeddings.xlsx")

# Charger le fichier CSV
# Charger le fichier CSV
df = pd.read_csv("./se_loger_embeddings.csv", index_col=0)

# Convertir les chaînes de caractères en listes
df["embedding"] = df["embedding"].apply(lambda x: ast.literal_eval(x))

# Sélectionner la première ligne comme vecteur de référence
X_searchedHouse = np.array(df.head(1)["embedding"].values[0])

# Appliquer la fonction get_cosinus_diference entre la première ligne et toutes les autres
C = (
    df["embedding"]
    .apply(lambda x: get_cosinus_diference(X_searchedHouse, np.array(x)))
    .to_frame("cosine_similarity")
)


# Ajouter la colonne cosine_similarity au dataframe
results_df = pd.concat([df, C], axis=1)

# Trier le dataframe par cosine_similarity
results_df = results_df.sort_values(by="cosine_similarity", ascending=False)
# Enregistrer le dataframe dans un fichier CSV
# results_df.to_csv("./se_loger_embeddings_with_similarity_with_first_one.csv")
results_df.to_excel("./se_loger_embeddings_with_similarity_with_first_one.xlsx")
