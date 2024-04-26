import os
import requests
import dotenv
import os
from serpapi import GoogleSearch
import json



dotenv.load_dotenv()
serp_api_key = os.getenv('SERP_API_KEY')


def custom_scholar_search(query):
    params = {
        "engine": "google_scholar",
        "q": query,
        "api_key": serp_api_key,
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    resp_json = results['organic_results']
    if  resp_json:
        results = ""
        for result in resp_json:
            details = f"""
            Paper Title - {result['title']}
            Paper Description - {result['snippet']}
            Paper Link - {result['link']}\n\n
            """
            results += details
            
    return results      
    
    

      
