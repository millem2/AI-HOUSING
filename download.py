import time
from multiprocessing import cpu_count
from multiprocessing.pool import ThreadPool

import pandas as pd
import requests

df = pd.read_json("./data/finalDatas.json")
photos = df["photos"].tolist()
# Photos is a list of lists, we want to flatten it
photos = [item for sublist in photos for item in sublist]
print(len(photos))


# Create an array with all download destinations
download_destinations = [
    f"./data/images/{url.split('/')[-1].split('.')[0]}.jpg" for url in photos
]
print(download_destinations[0:5])

inputs = zip(photos, download_destinations)


def download_url(args):
    t0 = time.time()
    url, fn = args[0], args[1]
    try:
        r = requests.get(url)
        with open(fn, "wb") as f:
            f.write(r.content)
        return (url, time.time() - t0)
    except Exception as e:
        print("Exception in download_url():", e)


def download_parallel(args):
    cpus = cpu_count()
    results = ThreadPool(cpus - 1).imap_unordered(download_url, args)
    for result in results:
        print(result)
        print("url:", result[0], "time (s):", result[1])


download_parallel(inputs)
