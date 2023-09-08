from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from os import environ
import io
import json
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
import db
from bson.json_util import dumps, loads

app = Flask(__name__)
CORS(app)

@app.route("/optimisePrompt", methods=["GET"])
def optimisePrompt():
    data = request.get_json()
    prompt = data["prompt"]
    EDENAI_API_KEY = environ.get('EDENAI_API_KEY')
    headers = {"Authorization": f"Bearer {EDENAI_API_KEY}"}
    url ="https://api.edenai.run/v2/text/prompt_optimization"
    payload = {
        "providers": "openai",
        "text": "Alabasta Bakery is a chain that delivers delicious bakery items like cakes, breads, pastries, cookies and many similar packaged items. Need to create an image for email advertisement for the upcoming Indian Independence day for all the users getting 20 percent discount on all the products.",
        "target_provider" : "google"
    }
    response = requests.post(url, json=payload, headers=headers)

    result = json.loads(response.text)
    # print(result['openai'])
    return result['openai']

def generateImg(prompt):
    API_URL = "https://api.edenai.run/v2/image/generation"
    EDENAI_API_KEY = environ.get('EDENAI_API_KEY')
    headers  = {"Authorization": f"Bearer {EDENAI_API_KEY}"}
    provider = "openai"
    payload = {
    "providers": provider,
    "text": prompt,
    "resolution" : "512x512"
    }
    
    response = requests.post(API_URL, headers=headers, json=payload)

    result = json.loads(response.text)
    image_url = result[provider]['items'][0]['image_resource_url']
    return image_url

def generateCaption(prompt):
    url = "https://api.textcortex.com/v1/texts/ads"
    payload = {
        "description": prompt,
        "max_tokens": 250,
        "mode": "general",
        "model": "chat-sophos-1",
        "n": 1,
        "name": "rakugen",
        "source_lang": "en",
        "target_lang": "en",
        "temperature": 0.65
    }
    TEXT_CORTEX_API = environ.get('TEXT_CORTEX_API')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TEXT_CORTEX_API}"
    }

    response = requests.post(url, json=payload, headers=headers)
    caption = json.loads(response.text)["data"]["outputs"][0]["text"]
    return caption
    
def generateImg2(prompt):
    res = requests.get(f'https://www.genpictures.com/api/image?prompt={prompt}')
    image = 'data:image/jpg;base64,'+res.json()['imageData']
    resp = {}
    resp["image"] = image
    return resp

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data["prompt"]
    # prompt = "To generate a advertisement for Bakery on Indian Independence day for social media posts"
    img_url = generateImg2(prompt)
    text = generateCaption(prompt)
    
    res = {}
    res["img_url"] = img_url
    res["caption"] = text
    
    return res

# @app.route("/genImage2", methods=["POST"])
# def generateImages2():
#     data = request.get_json()
#     prompt = data["prompt"]
#     res = requests.get(f'https://www.genpictures.com/api/image?prompt={prompt}')
#     image = 'data:image/jpg;base64,'+res.json()['imageData']
#     resp = {}
#     resp["image"] = image
#     return resp

# Hugging Face Method

# @app.route("/genImage", methods=["POST"])
# def generateImages():
#     data = request.get_json()
#     # print(data)
#     API_URL = environ.get('IMG_API_URL')
#     API_TOKEN = environ.get('IMG_API_TOKEN')
#     print(API_URL)
#     print(API_TOKEN)
#     headers = {"Authorization": f"Bearer {API_TOKEN}"}
#     try:
#         image_bytes = handle_hfquery(API_URL, headers, {
#             "inputs": "advertisement image without text for bakery house on indian independence day",
#         })
#         image = Image.open(io.BytesIO(image_bytes))
#         image.save("temp.jpg")
#     except:
#         print("Some Error")
#     resp = {}
#     resp["status"] = "WIP"
#     return resp

# def post_request(API_URL, headers, payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response

# def handle_hfquery(API_URL, headers, payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     print(response)
#     return response.content

@app.route("/test")
def add_campaign2():
    db.db.campaigns.insert_one({"name": "John"})
    return "Connected to the data base!"

@app.route('/add_campaign', methods=["POST"])
def add_campaign():
    post_data = request.get_json()
    try:
        campaign_doc = {
                        'id': post_data['id'],
                        'title': post_data['title'],
                        'raw_prompt': post_data['raw_prompt'],
                        'engineered_prompt': post_data['engineered_prompt'],
                        'generated_content': post_data['generated_content'],
                        'base64_img': post_data['base64_img'],
                        'created_date': post_data['created_date'],
                        'schedule_date': post_data['schedule_date'],
                        'medium': post_data['medium']
                    }
        db.db.campaigns.insert_one(campaign_doc)
        return jsonify({"response": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/update_campaign', methods=['POST'])
def query_records():
    post_data = request.get_json()
    id = post_data['id']
    title = post_data['title']
    schedule_date = post_data['schedule_date']
    generated_content = post_data['generated_content']
    if not id:
        return jsonify({'error': 'campaign not found'})
    else:
        response = db.db.campaigns.update_one(
            { "id": id },
            { "$set": { "title ": title, "schedule_date" : schedule_date, "generated_content":generated_content } }
        )
        return jsonify({"response": "success"}), 200
    
@app.route('/delete_campaign', methods=["DELETE"])
def delete_campaign():
    post_data = request.get_json()
    try:
        id = post_data['id']
        response = db.comments.delete_one( { "id": id } )

        return jsonify({"response": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/search', methods=["GET"])
def search_campaign():
    try:
        campaign_records = db.db.campaigns.find({})
        records = []
        list_cur = list(campaign_records)
  
        # Converting to the JSON
        json_data = dumps(list_cur, indent = 2)
        print(json_data)
        return json_data

    except Exception as e:
        return jsonify({'error': str(e)}), 400

def main():
    print(compare_with_base())

if __name__ == '__main__':
    main()