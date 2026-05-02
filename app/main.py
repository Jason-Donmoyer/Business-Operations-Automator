from fastapi import FastAPI
from app.routes.upload import router as uploader
from app.routes.reports import router as reporter

app = FastAPI()
app.include_router(uploader)
app.include_router(reporter)

@app.get("/")
def read_root():
    return {"Hello": "World"}


