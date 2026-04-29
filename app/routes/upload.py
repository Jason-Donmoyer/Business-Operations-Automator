from fastapi import APIRouter, File, UploadFile, HTTPException

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile):
    path = "data/uploads/" + file.filename
    if file.filename.split(".")[-1] == "csv":
        content = await file.read()
        with open(path, "wb") as f:
            f.write(content)
        return("Success!")
    else:
        raise HTTPException(status_code=400, detail='File type not supported.')
    