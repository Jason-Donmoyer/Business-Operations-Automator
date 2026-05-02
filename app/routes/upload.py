from fastapi import APIRouter, File, UploadFile, HTTPException
from app.cleaner import clean_csv

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile):
    path = "data/uploads/" + file.filename
    if file.filename.split(".")[-1] == "csv":
        content = await file.read()
        with open(path, "wb") as f:
            f.write(content)
        clean_file = clean_csv(path)
        return(clean_file.to_dict(orient="records"))
    else:
        raise HTTPException(status_code=400, detail='File type not supported.')
    

