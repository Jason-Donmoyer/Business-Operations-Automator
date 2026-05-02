from fastapi import APIRouter, HTTPException
from app.cleaner import clean_csv


router = APIRouter()

@router.get("/report")
def generate_report(file_name: str):
    return clean_csv("data/uploads/" + file_name).to_dict(orient="records")