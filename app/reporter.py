import os
import pandas as pd
import json

def generate_report(data: pd.DataFrame, filename: str):
    filename = filename.split('.')[0]
    path = 'data/reports/' + filename
    os.makedirs(path, exist_ok=True)
    total_revenue = int(data.revenue.sum())
    total_sales_tax = int(data.sales_tax.sum())
    revenue_by_category = data.groupby('category').revenue.sum().to_dict()
    product_volume = data.groupby('product')['units_sold'].sum().to_dict()
    content = {
        'total_revenue': total_revenue, 
        'total_sales_tax': total_sales_tax,
        'revenue_by_category': revenue_by_category, 
        'product_volume': product_volume
    }
    with open(path + '/' + filename + '.json', "w") as f:
        json.dump(content, f, indent=4)
    data.to_excel(path + '/' + filename + '.xlsx', index=False, engine='openpyxl')
    return content