from nltk.stem import PorterStemmer

import joblib
import re
import json
import urllib
import requests
from sklearn.neural_network import MLPClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from fastapi import FastAPI

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def get_root():
    return {'message': 'Welcome to the spam detection API'}


def preprocess(data):
    """This function takes a string as an input and cleans the text

       Does the following:

       1. Making all the data to lowercase
       2. Decontractions - you've -> you have
       3. Removing words that is of length 2 or less
       4. Removes all the non alphabets i.e. comma , . - _ numbers 
       5. Removing all extra spaces
       6. Removing all stopwords
       7. Removing all words whose length < 3 and > 15.

       """

    stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've",
                 "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself',
                 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their',
                 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those',
                 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
                 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
                 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
                 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
                 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
                 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
                 's', 't', 'can', 'will', 'just', 'don', "don't"]

    data = data.lower()  # Making all the data to lowercase

    data = re.sub(r"n\'t", " not", data)  # decontraction
    data = re.sub(r"\'re", " are", data)  # decontraction
    data = re.sub(r"\'s", " is", data)  # decontraction
    data = re.sub(r"\'d", " would", data)  # decontraction
    data = re.sub(r"\'ll", " will", data)  # decontraction
    data = re.sub(r"\'t", " not", data)  # decontraction
    data = re.sub(r"\'ve", " have", data)  # decontraction
    data = re.sub(r"\'m", " am", data)  # decontraction

    d = data.split()
    d.append('0')
    for index, i in enumerate(d):
        if len(i) <= 2:  # removing words that is of length 2 or less
            d[index] = '0'
    data = ' '.join(d)

    # removing all the non alphabets i.e. comma , . - _ numbers
    data = re.sub('[^a-z ]', ' ', data)
    data = re.sub("\s+", ' ', data)  # removing all extra spaces
    data = data.strip()  # removing spaces at the end

    # removing all stopwords
    data = ' '.join([i for i in data.split() if i not in stopwords])
    # removing all words whose length < 3 and > 15.
    data = ' '.join([w for w in data.split() if len(w) > 3 and len(w) < 15])

    return data


def stem(data_corpus):
    """ Takes a list of sentences as input

        Uses Porter Stemmer to stem the stentences

        Ex: looking look looked -> look look look 

    """
    ps = PorterStemmer()
    stemmed_data = []
    for sentence in data_corpus:
        stemmed_data.append(" ".join([ps.stem(i) for i in sentence.split()]))
    return stemmed_data

@app.get('/')
def get_root():
    return {'message': 'Welcome to the spam detection API'}

@app.get('/predict/{message}')
async def predict(message):
    model = joblib.load('model.pkl')
    vectoriser = joblib.load('vectoriser.pkl')
    preprocessed_text = preprocess(message)
    stemmed_text = stem([preprocessed_text])
    vector = vectoriser.transform(stemmed_text)
    pred = model.predict(vector)

    for i in pred:
        result = []
        if i[0] == 1:
            result.append("This type of act is Commenting. Would you like to report this?")
        if i[1] == 1:
            result.append("This type of act is Staring. Would you like to report this?")
        if i[2] == 1:
            result.append("This type of act is Groping. Would you like to report this?")
        if len(result) == 0:
            result.append(
                'This type of act is not in our database. Would you still like to report this?')

    return ({'predictions': ' , '.join(result)})

class IPQS:
    key = '6rZMieTmIJQcr3QU0rLidWz7QL1dFOwZ'

    def malicious_url_scanner_api(self, url: str, vars: dict = {}) -> dict:
        url = 'https://www.ipqualityscore.com/api/json/url/%s/%s' % (
            self.key, urllib.parse.quote_plus(url))
        x = requests.get(url, params=vars)
        return json.loads(x.text)


@app.get("/ipqs/{url}")
async def ipqs_malicious_url_scanner_api(url: str, strictness: int = 0) -> dict:
    additional_params = {
        'strictness': strictness
    }
    ipqs = IPQS()
    result = ipqs.malicious_url_scanner_api(url, additional_params)

    if 'success' in result and result['success'] == True:
        return result
    else:
        return {"error": "Unable to scan the URL."}
