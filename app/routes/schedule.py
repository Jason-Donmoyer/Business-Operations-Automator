from fastapi import APIRouter, HTTPException
from app.scheduler import scheduler, process_uploads

router = APIRouter()

@router.post('/schedule')
async def updateScheduler(interval_value: float):
    scheduler.reschedule_job("main-job", trigger="interval", hours=interval_value)
    return {"message": f"Schedule updated to every {interval_value} hours"}