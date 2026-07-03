import asyncio
import websockets
import json
import random

async def main():
    uri = "ws://localhost:8000/ws/stream"

    async with websockets.connect(uri) as websocket:

        while True:

            packet = {
                "raw_x": random.randint(100, 300),
                "raw_y": random.randint(100, 300),
                "face_detected": True,
                "screen_words": [
                    {
                        "word": "dyslexia",
                        "x1": 100,
                        "y1": 100,
                        "x2": 300,
                        "y2": 300
                    }
                ]
            }

            await websocket.send(
                json.dumps(packet)
            )

            try:
                response = await asyncio.wait_for(
                    websocket.recv(),
                    timeout=0.1
                )

                print(response)

            except:
                pass

            await asyncio.sleep(0.1)

asyncio.run(main())