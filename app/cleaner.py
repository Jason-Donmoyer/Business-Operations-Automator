import pandas as pd

def clean_csv(file_path: str):
    df = pd.read_csv(file_path).drop_duplicates()
    df[df.select_dtypes(include='object').columns] = df.select_dtypes(include='object').apply(lambda x: x.str.strip())
    df[df.select_dtypes(include='number').columns] = df.select_dtypes(include='number').fillna(0)
    df[df.select_dtypes(include='object').columns] = df.select_dtypes(include='object').fillna("Unknown")

    return df