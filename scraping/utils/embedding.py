import os
from typing import List, Optional

from dotenv import load_dotenv
from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_random_exponential

load_dotenv()

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.getenv("OPENAI_API_KEY"),
)

count = 0


@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
def get_embedding(
    text: str, model="text-similarity-davinci-001", **kwargs
) -> List[float]:
    global count
    # replace newlines, which can negatively affect performance.
    text = text.replace("\n", " ")
    print(f"Getting embedding for: {text}")

    response = client.embeddings.create(input=[text], model=model, **kwargs)
    count += 1
    print(f"count: {count}")

    # print(response)

    return response.data[0].embedding