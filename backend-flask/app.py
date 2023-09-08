from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from os import environ
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route("/genImage", methods=["POST"])
def generateImages():
    data = request.get_json()
    # print(data)
    API_URL = environ.get('IMG_API_URL')
    API_TOKEN = environ.get('IMG_API_TOKEN')
    print(API_URL)
    print(API_TOKEN)
    headers = {"Authorization": f"Bearer {API_TOKEN}"}
    try:
        image_bytes = handle_hfquery(API_URL, headers, {
            "inputs": "advertisement image without text for bakery house on indian independence day",
        })
        image = Image.open(io.BytesIO(image_bytes))
        image.save("temp.jpg")
    except:
        print("Some Error")
    resp = {}
    resp["status"] = "WIP"
    return resp

def handle_hfquery(API_URL, headers, payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    print(response)
    return response.content

def main():
    print(compare_with_base())

if __name__ == '__main__':
    main()