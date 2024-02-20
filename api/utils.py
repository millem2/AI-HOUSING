import os
from typing import List, Optional
import pandas as pd
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_random_exponential
import ast

load_dotenv()

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

count = 0


@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
def get_embedding(
    text: str, model="text-similarity-davinci-001", **kwargs
) -> List[float]:
    global count
    # replace newlines, which can negatively affect performance.
    text = text.replace("\n", " ")

    response = client.embeddings.create(input=[text], model=model, **kwargs)
    count += 1
    print(f"count: {count}")

    # print(response)

    return response.data[0].embedding


def get_cosinus_diference(vector1, vector2):
    vector1 = np.array(vector1, dtype=float)
    vector2 = np.array(vector2, dtype=float)

    cosinus = np.dot(vector1, vector2) / (
        np.linalg.norm(vector1) * np.linalg.norm(vector2)
    )
    return cosinus


def get_houses_similar_to_label(label: str):
    print("searching houses similar to label ", label)
    df = pd.read_csv("./finalDatas_embeddings.csv", index_col=0)

    # Convertir les chaînes de caractères en listes
    df["embedding"] = df["embedding"].apply(lambda x: ast.literal_eval(x))

    # Sélectionner la première ligne comme vecteur de référence
    X_searchedHouse = get_embedding(label)

    # Appliquer la fonction get_cosinus_diference entre la première ligne et toutes les autres
    similarities = (
        df["embedding"]
        .apply(lambda x: get_cosinus_diference(X_searchedHouse, np.array(x)))
        .to_frame("cosine_similarity")
    )

    print("similarities", similarities.shape)

    # Ajouter la colonne cosine_similarity au dataframe
    results_df = pd.concat([df, similarities], axis=1)

    # Trier le dataframe par cosine_similarity
    results_df = results_df.sort_values(by="cosine_similarity", ascending=False)

    # Enregistrer le dataframe dans un fichier CSV
    # results_df.to_csv("./se_loger_embeddings_with_similarity_with_first_one.csv")
    results_df.to_excel("./se_loger_embeddings_with_similarity_with_label.xlsx")

    return results_df.to_json(force_ascii=False)

    # Itérer sur les indices de 0 à num_rows - 1

    median = np.median(similarities.cosine_similarity)
    print("mediane de similarité", median)

    average = np.mean(similarities.cosine_similarity)
    print("moyenne de similarité", average)
