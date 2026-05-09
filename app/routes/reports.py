from fastapi import APIRouter, HTTPException
from app.cleaner import clean_csv
from app.reporter import generate_report


router = APIRouter()

@router.get("/report")
def upload_report(file_name: str):
    clean_data = clean_csv("data/uploads/" + file_name)
    return generate_report(clean_data, file_name)