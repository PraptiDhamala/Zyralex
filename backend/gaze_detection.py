import cv2
import numpy as np 

# video lai load gareko
cap = cv2.VideoCapture("eyehehe.mp4")

while True:
    ret, frame = cap.read()
#    roi = frame[50:2000, 200:1300] #from top to bottom, left to right, these number
    if not ret:
        print("Video ended or cannot be read.")
        break
    roi = frame[100:1200, 50:1300] #from top to bottom, left to right, these number 
    rows, cols, _ = roi.shape
    gray_roi = cv2.cvtColor(roi,cv2.COLOR_BGR2GRAY) #gray pardincha video
    gray_roi = cv2.GaussianBlur(gray_roi, (7,7), 0)
    _, threshold = cv2.threshold(gray_roi, 35, 255, cv2.THRESH_BINARY_INV)    # video sakiyo or read garna sakena vane break huncha
    contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours= sorted(contours, key=lambda x: cv2.contourArea(x), reverse=True)
    print(contours)
    for cnt in contours:
        (x,y,w,h) = cv2.boundingRect(cnt)
        #  cv2.drawContours(roi, [cnt], -1, (0,0,255), 3)
        if cv2.contourArea(cnt) < 100:
            continue
        aspect_ratio = float(w) / h
        if aspect_ratio < 0.4 or aspect_ratio > 2.3:
            continue
        cv2.rectangle(roi, (x,y) ,(x+w,y+h), (255,0,0), 2)
        cv2.line(roi,(x+int(w/2),0),(x+int(w/2),rows),(0,255,0),2)
        cv2.line(roi,(0, y+int(h/2)),(cols,y+int(h/2)),(0,255,0),2)

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