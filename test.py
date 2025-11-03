import pandas as pd
import re

# Load the Excel file
file_path = 'R:/LLM + RAG/Food Composition Tables/Table_1._PROXIMATE_PRINCIPLES_AND_DIETARY_FIBRE.xlsx'
df = pd.read_excel(file_path)

# Define a function to clean the cell values
def clean_cell(cell):
    if isinstance(cell, str):
        # Use regular expression to remove everything after + or -
        return re.split(r'[+-]', cell)[0]
    return cell  # Return the cell as is if it's not a string

# Apply the function to each cell in the DataFrame
df = df.applymap(clean_cell)

# Save the cleaned DataFrame back to a new Excel file
cleaned_file_path = 'cleaned_file.xlsx'
df.to_excel(cleaned_file_path, index=False)

print(f"Cleaned data saved to {cleaned_file_path}")