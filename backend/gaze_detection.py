import cv2
import numpy as np

# camera ko default camera kholcha
cap = cv2.VideoCapture(0)


# yo sab is pretrained face and eyes detection model haar cascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_eye.xml"
)

while True:


    ret, frame = cap.read()
 
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
# Searches the image for faces. Returns coordinates
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
# If multiple faces appear, process each one.
    for (x, y, w, h) in faces:

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)

        face_roi_gray = gray[y:y+h, x:x+w]
        face_roi_color = frame[y:y+h, x:x+w]

        eyes = eye_cascade.detectMultiScale(face_roi_gray)

        for (ex, ey, ew, eh) in eyes:

            # Eye ROI
            eye = face_roi_color[ey:ey+eh, ex:ex+ew]
            eye_gray = cv2.cvtColor(eye, cv2.COLOR_BGR2GRAY)

            eye_gray = cv2.GaussianBlur(eye_gray, (7,7), 0)

            _, threshold = cv2.threshold(
                eye_gray,
                35,
                255,
                cv2.THRESH_BINARY_INV
            )

            # Find contours
            contours, _ = cv2.findContours(
                threshold,
                cv2.RETR_TREE,
                cv2.CHAIN_APPROX_SIMPLE
            )

            contours = sorted(
                contours,
                key=lambda x: cv2.contourArea(x),
                reverse=True
            )

            for cnt in contours:

                area = cv2.contourArea(cnt)

                if area < 100:
                    continue

                (cx, cy, cw, ch) = cv2.boundingRect(cnt)

                pupil_x = cx + cw//2
                pupil_y = cy + ch//2

                cv2.circle(
                    eye,
                    (pupil_x, pupil_y),
                    5,
                    (0,0,255),
                    -1
                )

                eye_center = ew // 2

                if pupil_x < eye_center - 10:
                    text = "Looking Left"

                elif pupil_x > eye_center + 10:
                    text = "Looking Right"

                else:
                    text = "Looking Center"

                cv2.putText(
                    frame,
                    text,
                    (50,50),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (255,0,0),
                    2
                )

                break

            cv2.imshow("Threshold", threshold)

    cv2.imshow("Gaze Detection", frame)

    key = cv2.waitKey(1)

    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()