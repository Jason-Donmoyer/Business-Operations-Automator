from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routes.upload import router as uploader
from app.routes.reports import router as reporter
from app.scheduler import scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.stop()

app = FastAPI(lifespan=lifespan)
app.include_router(uploader)
app.include_router(reporter)


@app.get("/")
def read_root():
    return {"Hello": "World"}


