import numpy as np

def frame_distance(f1, f2):
    f1 = np.array(f1)
    f2 = np.array(f2)

    # L2 distance (more stable than RMSE here)
    return np.linalg.norm(f1 - f2)
def dtw_distance(seq1, seq2):

    n, m = len(seq1), len(seq2)

    dp = np.full((n + 1, m + 1), float("inf"))
    dp[0][0] = 0

    for i in range(1, n + 1):
        for j in range(1, m + 1):

            cost = frame_distance(seq1[i - 1], seq2[j - 1])

            dp[i][j] = cost + min(
                dp[i - 1][j],      # insert
                dp[i][j - 1],      # delete
                dp[i - 1][j - 1]   # match
            )

    return dp[n][m]