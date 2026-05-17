import cv2
import numpy as np 

# video lai load gareko
cap = cv2.VideoCapture("eye.mp4")

while True:
    ret, frame = cap.read()
    
    # video sakiyo or read garna sakena vane break huncha
    if not ret:
        print("Video ended or cannot be read.")
        break

    # Display the frame, frame vaneko the same video we are talking about
    cv2.imshow("Frame", frame)
    
    key = cv2.waitKey(30)
    
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()