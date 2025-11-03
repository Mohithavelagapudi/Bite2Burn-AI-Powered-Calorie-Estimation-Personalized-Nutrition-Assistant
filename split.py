from bs4 import BeautifulSoup

# Mapping for food categories
category_mapping = {
    'A': 'CEREALS AND MILLETS',
    'B': 'GRAIN LEGUMES',
    'C': 'GREEN LEAFY VEGETABLES',
    'D': 'OTHER VEGETABLES',
    'E': 'FRUITS',
    'F': 'ROOTS AND TUBERS',
    'G001 to G018': 'CONDIMENTS AND SPICES-FRESH',
    'G019 to G033': 'CONDIMENTS AND SPICES-DRY',
    'H': 'NUTS AND OIL SEEDS',
    'I': 'SUGARS',
    'J': 'MUSHROOMS',
    'K': 'MISCELLANEOUS FOODS',
    'L': 'MILK AND MILK PRODUCTS',
    'M': 'EGG AND EGG PRODUCTS',
    'N': 'POULTRY',
    'O': 'ANIMAL FAT',
    'P': 'MARINE FISH',
    'Q': 'MARINE SHELLFISH',
    'R': 'MARINE MOLLUSKS',
    'S': 'FRESHWATER FISH AND SHELLFISH'
}
 
def split_html_by_alphabet(file_path):
    # List to hold each split HTML content
    html_splits = []

    # Read and parse the HTML file
    with open(file_path, 'r') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # Extract table headers
    headers = soup.find_all('th')
    header_html = ''.join(str(th) for th in headers)

    # Initialize a dictionary to store rows by alphabetical prefix
    row_groups = {}

    # Iterate over each row in the table
    for row in soup.find_all('tr')[1:]:  # Skipping the header row
        # Extract the first cell to determine the alphabetical group
        first_cell = row.find_all('td')[0].text
        prefix = first_cell[0]
        
        # Handle the 'G' category with its sub-ranges
        if prefix == 'G':
            food_code_number = int(first_cell[1:])
            if 1 <= food_code_number <= 18:
                prefix = 'G001 to G018'
            elif 19 <= food_code_number <= 33:
                prefix = 'G019 to G033'

        # Add row to the corresponding prefix group
        if prefix not in row_groups:
            row_groups[prefix] = []
        row_groups[prefix].append(row)

    # Generate HTML split for each alphabetical group
    for prefix, rows in sorted(row_groups.items()):
        # Create a header row with the category name
        category_name = category_mapping.get(prefix, "UNKNOWN CATEGORY")
        category_header = f"<tr><th colspan='11'>{category_name}</th></tr>"

        # Create the table with the category header, table header, and group-specific rows
        split_html = f"<table>{category_header}<tr>{header_html}</tr>"
        split_html += ''.join(str(row) for row in rows)
        split_html += "</table>"

        # Add to the list of HTML splits
        html_splits.append(split_html)

    return html_splits

# Usage
file_path = r'D://AIE COURSE FILES//SEM - 7//FSD//PROJECT//ref.html'
html_splits = split_html_by_alphabet(file_path)

# Display or further process each split as needed
'''for index, split in enumerate(html_splits):
    print(f"HTML Split {index + 1}:\n", split)'''
