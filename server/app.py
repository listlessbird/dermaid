from predict import predict_class
from skin_detection import check_skin
import numpy as np
from datetime import datetime
from flask import Flask, request, jsonify
import tensorflow as tf
print(tf.__version__)


app = Flask(__name__)
UPLOAD_FOLDER = './UPLOADS/'


@app.route('/test')
def hello():
    return 'Hello'


@app.route('/predict', methods=['POST', 'GET'])
def get_image():
    filename = UPLOAD_FOLDER + str(np.random.randint(0, 5000)) + '.png'
    print('Image is incoming')
    photo = request.files['image']
    photo.save(filename)
    print('Image Saved..')
    if check_skin(filename):
        preds_dict = predict_class(filename)

        dict_dis = sorted(preds_dict.items(), key=lambda x: x[1], reverse=True)
        dict_dis = dict(sorted(preds_dict.items(),
                        key=lambda x: x[1], reverse=True)[:3])
        print(dict_dis)

        max_val = max(dict_dis, key=dict_dis.get)
        if dict_dis[max_val] <= 38:
            print('healthy')
            return jsonify({'message': 'Healthy Skin Detected?', 'probabilities': dict_dis})
        else:
            print('Done')
            return jsonify({
                'probabilities': dict_dis,
                'message': str(max_val),
            })
            # return jsonify({'message': str(max_val), 'percentage': str(dict_dis[max_val])})
    else:
        print("Looks like the image is not of the skin")
        return jsonify({'message': 'Please upload the image of the Infected Area'})


if __name__ == '__main__':
    app.run(port=5000, debug=True)
    # config = uvicorn.Config("app:app", port=5000,
    #                         log_level="info", host="0.0.0.0")
    # server = uvicorn.Server(config)
    # server.run()
    # uvicorn.run(app, host="0.0.0.0", port=5000)
