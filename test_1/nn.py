import os

path='/home/supra/test/new/'
if not os.path.exists(path):
    os.makedirs(path)
else:
    print('nope')