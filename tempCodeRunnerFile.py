# Lire le fichier CSV et télécharger les images
with open(csv_file_path, "r", encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        image_urls = row[4][1:-1].split(", ")
        for image_url in image_urls:
            if image_url.endswith(".jpg"):
                image_filename = os.path.join(
                    output_directory, os.path.basename(image_url)
                )
                download_image(image_url, image_filename)