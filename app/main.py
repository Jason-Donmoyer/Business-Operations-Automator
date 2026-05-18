from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from contextlib import asynccontextmanager
from app.routes.upload import router as uploader
from app.routes.reports import router as reporter
from app.routes.schedule import router as schedule_route
from app.scheduler import scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.stop()

app = FastAPI(lifespan=lifespan)
app.include_router(uploader)
app.include_router(reporter)
app.include_router(schedule_route)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse(request, "dashboard.html")


