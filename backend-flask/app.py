from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/genImage", methods=["POST"])
def generateImages():
    # data = request.get_json(force=True)
    # print(data)
    resp = {}
    resp["status"] = "WIP"
    return resp

def main():
    print(compare_with_base())

if __name__ == '__main__':
    main()