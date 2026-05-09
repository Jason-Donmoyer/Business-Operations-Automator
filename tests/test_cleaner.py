import pytest
import pandas as pd
from app.cleaner import clean_csv
import tempfile

# Test clean_csv to remove duplicates
def test_removes_duplicates():
    data = pd.DataFrame({
        'product': ['Widget A', 'Widget A'],
        'revenue': [100, 100],
        'category': ['electronics', 'electronics']
        })
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as tf:
        data.to_csv(tf.name, index=False)
    clean_data = clean_csv(tf.name)
    assert len(clean_data) == 1

# Test clean_csv removes extra whitespace
def test_removes_whitespace():
    data = pd.DataFrame({
        'product': ['Widget   A', 'Widget B'],
        'revenue': [100 , 400],
        'category': [' electronics', 'books   ']
        })
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as tf:
        data.to_csv(tf.name, index=False)
    clean_data = clean_csv(tf.name)
    assert clean_data['product'][0] == 'Widget A'
    assert clean_data['revenue'][0] == 100
    assert clean_data['category'][0] == 'electronics'
    assert clean_data['category'][1] == 'books'

# Test to fill empty columns
def test_adds_values():
    data = pd.DataFrame({
        'product': ['Widget A', ''],
        'revenue': [None, 400],
        'category': [' electronics', 'books']
        })
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as tf:
        data.to_csv(tf.name, index=False)
    clean_data = clean_csv(tf.name)
    print(clean_data.dtypes)
    assert clean_data['product'][1] == 'Unknown'
    assert clean_data['revenue'][0] == 0