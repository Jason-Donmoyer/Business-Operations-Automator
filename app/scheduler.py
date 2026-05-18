import os
from apscheduler.schedulers.background import BackgroundScheduler
from app.cleaner import clean_csv
from app.reporter import generate_report

def process_uploads(uploads_dir='data/uploads'):
    uploads = os.listdir(uploads_dir)
    csv_files = []
    for upload in uploads:
        if upload.split(".")[-1] == "csv":
            csv_files.append(upload)
    for file in csv_files:
        file_path = 'data/uploads/' + file
        clean_data = clean_csv(file_path)
        generate_report(clean_data, file)

scheduler = BackgroundScheduler()
scheduler.add_job(process_uploads, "interval", hours=1, id="main-job")

