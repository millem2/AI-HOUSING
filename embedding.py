import torch
import os
from transformers import AutoImageProcessor, AutoModel
from PIL import Image

# Charger le modèle pré-entraîné
model_ckpt = "nateraw/vit-base-beans"
processor = AutoImageProcessor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)

# Charger  la première image du dossier "image_a_traiter", on ne connait pas le nom de l'image
image_a_traiter = "image_a_traiter/" + os.listdir("image_a_traiter")[0]
image1 = Image.open(image_a_traiter)
image1.show()
inputs1 = processor(images=image1, return_tensors="pt")
# dossier de sauvegarde des embeddings
dossier_calcul_embedding = "save_embedding"

# liste des images dans le dossier "photos"
j = os.listdir("image")
# pour chaque image dans la liste
for i in j:
    # charges les images du dossier "photos" et les compare avec "image_a_traiter"
    image_acomparer = "image/" + i
    image2 = Image.open(image_acomparer)
    inputs_acomparer = processor(images=image2, return_tensors="pt")
    # Calculer les embeddings
    with torch.no_grad():
        embeddings1 = model(**inputs1).last_hidden_state.mean(dim=1)
        embeddings2 = model(**inputs_acomparer).last_hidden_state.mean(dim=1)

    # Créer un dossier pour stocker les embeddings
    os.makedirs(dossier_calcul_embedding, exist_ok=True)

    # Chemin vers le fichier d'embedding
    chemin_embedding = os.path.join(dossier_calcul_embedding, f"{i}.pt")
    torch.save(embeddings2, chemin_embedding)
    print(f"Embedding de {image2} sauvegardé dans {chemin_embedding}")

    # Calculer la similarité cosinus
    similarity_score = torch.nn.functional.cosine_similarity(
        embeddings1, embeddings2
    ).item()

    print(f"Similarité entre les images : {similarity_score:.4f}")
    # si la similarité est supérieur à 0.6, on plot l'image
    if similarity_score > 0.6:
        print("Similarité entre les images : {similarity_score:.4f}")
        print("les images sont similaires")
        image2.show()
    else:
        print("les images ne sont pas similaires")
