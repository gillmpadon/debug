from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        received_text = request.form.get('text')
        file = open("sample.txt","w") 
        file.write(received_text) 
        print("File created and data written successfully!")
        return jsonify({'text': "Send"})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
