import torch
import os
from transformers import AutoImageProcessor, AutoModel
from PIL import Image

# Charger le modèle pré-entraîné
model_ckpt = "nateraw/vit-base-beans"
processor = AutoImageProcessor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)

# Charger les images (vous pouvez remplacer ces chemins par vos propres images)
image_a_traiter = "image_a_traiter/0kk3lh2o9i78bd48hor1771m10bjlxlttlkefza8w.jpg"
image1 = Image.open(image_a_traiter)
image1.show()
inputs1 = processor(images=image1, return_tensors="pt")
# Chemin vers les autres images à comparer

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
