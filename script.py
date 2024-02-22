import csv
import os
import requests

# Chemin vers le fichier CSV contenant les URLs des images
csv_file_path = "api/finalDatas_embeddings.csv"

# Répertoire de destination pour enregistrer les images
output_directory = "image_test"

# Créez le répertoire s'il n'existe pas
if not os.path.exists(output_directory):
    os.makedirs(output_directory)


# Fonction pour télécharger une image depuis une URL
def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, "wb") as file:
                file.write(response.content)
                print(f"Image {filename} téléchargée avec succès.")
        else:
            print(
                f"Échec du téléchargement de l'image {filename}. Code d'état : {response.status_code}"
            )
    except Exception as e:
        print(f"Erreur lors du téléchargement de l'image {filename} : {e}")


# Lire le fichier CSV et télécharger les images

with open(csv_file_path, "r", encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    # rechercher .png sur toutes les colonnes
    for row in reader:
        for column in row:
            # vérifier si dans la colonne il y a un .jpg, séparer les .jpg des autres. Voici le format des images : "['url1.jpg', 'url2.jpg']". Il est important d'enlever les crochets et les guillemets pour pouvoir télécharger les images.
            if ".jpg" in column:
                image_urls = column.strip("[]").replace("'", "").split(", ")
                for image_url in image_urls:
                    # le nom de l'image doit être identique à url du fichier csv
                    image_filename = os.path.join(
                        output_directory, os.path.basename(image_url)
                    )
                    # verifier si l'image existe déjà
                    if os.path.exists(image_filename):
                        print(f"L'image {image_filename} existe déjà.")
                    else:
                        download_image(image_url, image_filename)


print("Tous les fichiers .jpg ont été téléchargés avec succès !")
