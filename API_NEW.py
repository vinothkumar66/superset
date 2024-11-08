from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import os, datetime
import uvicorn

app = FastAPI()

class ImagePath(BaseModel):
    path: str
class PDFPath(BaseModel):
    path: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8088"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

directory_path = '/home/supra/superset/report_output'
print(directory_path)
def list_directories(path):
    directories = []
    dir_id = 1 

    for root, dirs, files in os.walk(path):
        for dir_name in dirs:
            creation_time = os.path.getctime(os.path.join(root, dir_name))
            creation_time_readable = datetime.datetime.fromtimestamp(creation_time)
            directories.append({
                'report_id': dir_id,
                'report_folder_path': os.path.join(root, dir_name),
                'report_folder': dir_name,
                'creation_time': creation_time_readable,
            })
            dir_id += 1
    return directories

def list_path(path, dir):
    directories = dir
    dir_id=1
    report_dir = []
    for path in directories:
        for root, dirs, files in os.walk(path['report_folder_path']):
            dir_id=1
            for file in files:
                creation_time = os.path.getctime(os.path.join(root, file))
                creation_time_readable = datetime.datetime.fromtimestamp(creation_time)
                report_dir.append({'report_id':int(path['report_id']),'file_id':dir_id,'report_file_path':os.path.join(root, file),'report_file':file,'creation_time':creation_time_readable})
                dir_id += 1
    return report_dir

@app.get("/dir")
async def get_directories():
    dirs = list_directories(directory_path)
    return dirs

@app.get("/file")
async def get_files():
    dirs = list_directories(directory_path)
    file = list_path(directory_path, dirs)
    return file

@app.post("/image")
async def show_image(image_path: ImagePath):
    return FileResponse(image_path.path)

@app.post("/pdf")
async def show_pdf(pdf_path: PDFPath):
    return FileResponse(pdf_path.path, media_type="application/pdf")


if __name__ == "__main__":
    uvicorn.run("API_NEW:app", host="127.0.0.1", port=7000)