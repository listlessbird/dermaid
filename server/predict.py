from tensorflow.keras.applications.xception import preprocess_input
import numpy as np
from tqdm import tqdm
import tensorflow as tf
import tensorflow.keras as K
# print(tf.__version__)
# print(K)
# print(tf.keras)
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array

types = ['acne', 'carcinoma', 'eczema',
         'keratosis', 'millia', 'rosacea', 'none']


classes = {
    0: 'Acne/Rosacea',
    1: 'Actinic Keratosis/Basal Cell Carcinoma/Malignant Lesions',
    2: 'Eczema',
    3: 'Actinic Keratosis',
    4: 'Millia',
    5: 'Rosacea',
    6: 'Not a skin disease'
}

model = tf.keras.models.load_model("model/model.keras")


def predict_class(fname):
    img = image.load_img(fname, target_size=(299, 299))
    x = img_to_array(img)
    x = K.applications.xception.preprocess_input(x)
    prediction = model.predict(np.array([x]))[0]
    result = [(types[i], float(prediction[i]) * 100.0)
              for i in range(len(prediction))]
    result.sort(reverse=True, key=lambda x: x[1])

    preds = {k: v for (k, v) in result}
    print(preds)
    K.backend.clear_session()
    return preds


# predict_class("test_imgs/stock.jpg")
