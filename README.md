# Business Operations Automator

**Built for owners and operations managers spending countless hours reading unstructured reports to track sales and revenue. BizOps automates that so they can have consistent reports delivered on a scheduled basis.**

## Features
- Upload csv data files.
- Cleans data by removing duplicate items, cleans up excess whitespace and adds placeholder values to empty columns.
- Creates reports that can be readily accessed in a folder.
- App has the ability to be automated on a schedule.

## Tech Stack
### Python
- FastAPI
- Pandas
- Uvicorn

## Setup
Run these commands in your terminal window
### Clone the repo from Github
`git clone https://github.com/Jason-Donmoyer/Business-Operations-Automator`
### Create a Virtual Environment
`python -m venv .venv`
### Activate the Virtual Environment
- Windows Command Prompt
`.venv\Scripts\activate`
- Windows Power Shell
`.\.venv\Scripts\Activate.ps1`
- Mac OS
`source .venv/bin/activate`
### Install Dependencies
`pip install -r requirements.txt`
### Start the Server
`uvicorn app.main:app --reload`

## Usage
Start the server then navigate to http://127.0.0.1:8000/docs#/.
The two routes that you will use are POST/upload and GET/report.
Click the Try It Out button on /uploads and navigate to the csv file that you want to upload.
The file should be uploaded to the data/uploads folder.
Once you have uploads, use the /report Try It Out button to clean data and return a json file into data/reports.
There is sample data to use to try the app out - data/sample_data/sample_sales.csv
By default the app will loop through the uploads folder and generate new reports every hour as long as the server is running.

## Project Structure
```
-app
 -routes
  -reports.py
  -upload.py
 -cleaner.py
 -main.py
 -reporter.py
 -scheduler.py
-data
 -reports
 -uploads```