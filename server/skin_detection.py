import cv2
import numpy as np
from matplotlib import pyplot as plt


def get_hist(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (256, 256))

    img_HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    HSV_mask = cv2.inRange(img_HSV, (0, 15, 0), (17, 170, 255))
    HSV_mask = cv2.morphologyEx(
        HSV_mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

    img_YCrCb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    YCrCb_mask = cv2.inRange(img_YCrCb, (0, 135, 85), (255, 180, 135))
    YCrCb_mask = cv2.morphologyEx(
        YCrCb_mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

    global_mask = cv2.bitwise_and(YCrCb_mask, HSV_mask)
    global_mask = cv2.medianBlur(global_mask, 3)
    global_mask = cv2.morphologyEx(
        global_mask, cv2.MORPH_OPEN, np.ones((4, 4), np.uint8))

    HSV_result = cv2.bitwise_not(HSV_mask)
    YCrCb_result = cv2.bitwise_not(YCrCb_mask)
    global_result = cv2.bitwise_not(global_mask)

    cv2.imwrite("temp.jpg", global_result)

    hist = cv2.calcHist([global_result], [0], None, [256], [0, 256])
    return hist


def check_skin(image_name):
    hist = get_hist(image_name)
    a = hist[0]
    b = hist[255]
    percent = ((a / (a + b)) * 100.0).round(2)

    if percent > 5.00:
        return True
    else:
        return False
