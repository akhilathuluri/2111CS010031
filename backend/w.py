import time

timestamp = 1723879766
time_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp))
print(time_str)