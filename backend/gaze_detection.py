import cv2
import numpy as np 

# video lai load gareko
cap = cv2.VideoCapture("eyehehe.mp4")

while True:
    ret, frame = cap.read()
#    roi = frame[50:2000, 200:1300] #from top to bottom, left to right, these number

    roi = frame[100:1200, 50:1300] #from top to bottom, left to right, these number 
    gray_roi = cv2.cvtColor(roi,cv2.COLOR_BGR2GRAY) #gray pardincha video
    gray_roi = cv2.GaussianBlur(gray_roi, (7,7), 0)
    _, threshold = cv2.threshold(gray_roi, 60, 255, cv2.THRESH_BINARY_INV)
    # video sakiyo or read garna sakena vane break huncha
    _, contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    print(contours)
    for cnt in contours:
        cv2.drawContours(roi, [cnt], -1, (0,0,255), 3)
    if not ret:
        print("Video ended or cannot be read.")
        break

    # Display the frame, frame vaneko the same video we are talking about
    cv2.imshow("Threshold",  threshold)

    cv2.imshow("gray roi",  gray_roi)

    cv2.imshow("Roi", roi)
    
    key = cv2.waitKey(30)
    
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()import cv2
import numpy as np 

# video lai load gareko
cap = cv2.VideoCapture("eyehehe.mp4")

while True:
    ret, frame = cap.read()
#    roi = frame[50:2000, 200:1300] #from top to bottom, left to right, these number

    roi = frame[100:1200, 50:1300] #from top to bottom, left to right, these number 
    gray_roi = cv2.cvtColor(roi,cv2.COLOR_BGR2GRAY) #gray pardincha video
    gray_roi = cv2.GaussianBlur(gray_roi, (7,7), 0)
    _, threshold = cv2.threshold(gray_roi, 60, 255, cv2.THRESH_BINARY_INV)
    # video sakiyo or read garna sakena vane break huncha
    contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    print(contours)
    for cnt in contours:
        cv2.drawContours(roi, [cnt], -1, (0,0,255), 3)
    if not ret:
        print("Video ended or cannot be read.")
        break

    # Display the frame, frame vaneko the same video we are talking about
    cv2.imshow("Threshold",  threshold)

    cv2.imshow("gray roi",  gray_roi)

    cv2.imshow("Roi", roi)
    
    key = cv2.waitKey(30)
    
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()import cv2
import numpy as np 

# video lai load gareko
cap = cv2.VideoCapture("eyehehe.mp4")

while True:
    ret, frame = cap.read()
#    roi = frame[50:2000, 200:1300] #from top to bottom, left to right, these number

    roi = frame[100:1200, 50:1300] #from top to bottom, left to right, these number 
    gray_roi = cv2.cvtColor(roi,cv2.COLOR_BGR2GRAY) #gray pardincha video
    gray_roi = cv2.GaussianBlur(gray_roi, (7,7), 0)
    _, threshold = cv2.threshold(gray_roi, 60, 255, cv2.THRESH_BINARY_INV)
    # video sakiyo or read garna sakena vane break huncha
    contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    print(contours)
    for cnt in contours:
        cv2.drawContours(roi, [cnt], -1, (0,0,255), 3)
    if not ret:
        print("Video ended or cannot be read.")
        break

    # Display the frame, frame vaneko the same video we are talking about
    cv2.imshow("Threshold",  threshold)

    cv2.imshow("gray roi",  gray_roi)

    cv2.imshow("Roi", roi)
    
    key = cv2.waitKey(30)
    
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()