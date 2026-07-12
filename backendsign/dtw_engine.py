import numpy as np


def frame_distance(frame1, frame2):
    frame1 = np.asarray(frame1, dtype=np.float32)
    frame2 = np.asarray(frame2, dtype=np.float32)

    return np.linalg.norm(frame1 - frame2)


def dtw_distance(seq1, seq2):

    if len(seq1) == 0 or len(seq2) == 0:
        return float("inf")

    n = len(seq1)
    m = len(seq2)

    dp = np.full((n + 1, m + 1), np.inf, dtype=np.float32)
    dp[0, 0] = 0

    for i in range(1, n + 1):
        for j in range(1, m + 1):

            cost = frame_distance(
                seq1[i - 1],
                seq2[j - 1]
            )

            dp[i, j] = cost + min(
                dp[i - 1, j],
                dp[i, j - 1],
                dp[i - 1, j - 1]
            )

   
    return float(dp[n, m] / (n + m))