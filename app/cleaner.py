import pandas as pd

def clean_csv(file_path: str):
    df = pd.read_csv(file_path).drop_duplicates()
    if 'category' in df.columns:
        df['category'] = df['category'].str.lower()
    if 'product' in df.columns:
        df['product'] = df['product'].str.title()
    df[df.select_dtypes(include='str').columns] = df.select_dtypes(include='str').apply(lambda x: x.str.strip().str.split().str.join(' '))
    df[df.select_dtypes(include='number').columns] = df.select_dtypes(include='number').fillna(0)
    df[df.select_dtypes(include=['object', 'str']).columns] = df.select_dtypes(include=['object', 'str']).fillna("Unknown")

    return df