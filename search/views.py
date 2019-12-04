from django.shortcuts import render
from django.http import JsonResponse
import requests
import json

#takes in address and adds the key to the api request and returns data to javascript
def search_home(request):
    if request.method == 'GET' and request.is_ajax():
        key = hidden
        address = request.GET['address']
        params = {'address': address, 'key': key}
        response = requests.get("https://content.googleapis.com/civicinfo/v2/representatives", params=params)
        obj = json.loads(response.text)
        return JsonResponse(json.dumps(obj), safe=False)
    return render(request, 'search/search_home.html')

