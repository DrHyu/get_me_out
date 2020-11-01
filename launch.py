import subprocess
from sys import platform

if platform == "linux" or platform == "linux2":
    # linux

    subprocess.call(['docker', 'build', '-t', '/gmo_backend', '.'], shell=True)

    # subprocess.call(['docker', 'run', '-p', '/gmo_backend'], shell=True)
    # sudo docker build -t gmo_backend .
    # docker run -p 8000:8000 -i -t gmo_backend
elif platform == "win32":
    # Windows...	º
    pass
