import pandas as pd
import json

def generate_report(data: pd.DataFrame, filename: str):
    filename = filename.split('.')[0]
    path = 'data/reports/' + filename + '.json'
    total_revenue = int(data.revenue.sum())
    revenue_by_category = data.groupby('category').revenue.sum().to_dict()
    product_volume = data.groupby('product').count().to_dict(orient="index")
    content = {
        'total_revenue': total_revenue, 
        'revenue_by_category': revenue_by_category, 
        'product_volume': product_volume
    }
    with open(path, "w") as f:
        json.dump(content, f, indent=4)
    return content