import os
import argparse
from app.cleaner import clean_csv
from app.reporter import generate_report

parser = argparse.ArgumentParser(description='Process a CSV file')
parser.add_argument('filename', help='Path to the CSV file')
args = parser.parse_args()

clean_file = clean_csv(args.filename)
filename = os.path.basename(args.filename)
report = generate_report(clean_file, filename)
print('Total Revenue: ' + str(report['total_revenue']))
print('Total Sales Tax: ' + str(report['total_sales_tax']))
print('Revenue By Category:')
for category, revenue in report['revenue_by_category'].items():
    print(f"  {category}: {revenue}")
