import os
import requests
import dotenv
import json

dotenv.load_dotenv()

custom_search_api_key = os.getenv("CUSTOM_SEARCH_API_KEY")
search_engine_id = os.getenv("SEARCH_ENGINE_ID")


def custom_scholar_search(query):
    url = f"https://www.googleapis.com/customsearch/v1"

    params = {
        "q": query,
        "key": custom_search_api_key,
        "cx": search_engine_id,
    }
    
    return requests.get(url, params=params).json()
