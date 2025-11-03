from split import html_splits
from bs4 import BeautifulSoup

def html_splits_to_csv(html_splits):
    # List to hold CSV text for each HTML split
    csv_splits = []

    # Convert each HTML split to CSV with headers
    for html_split in html_splits:
        # Parse the HTML
        soup = BeautifulSoup(html_split, 'html.parser')
        
        # Extract headers from <th> tags
        headers = [th.text.strip() for th in soup.find_all('th')]
        header_line = ','.join(headers)

        # Initialize a list to store rows as CSV lines, starting with headers
        csv_rows = [header_line]

        # Iterate over rows in the table, excluding any extra header rows
        for row in soup.find_all('tr')[1:]:  # Skipping category header rows if present
            # Get text for each cell in the row
            cells = row.find_all('td')
            if cells:  # Only process rows with <td> cells
                csv_line = ','.join(cell.text.strip() for cell in cells)
                csv_rows.append(csv_line)

        # Join rows into a single CSV text for this split
        csv_text = '\n'.join(csv_rows)
        csv_splits.append(csv_text)

    return csv_splits

csv_splits = html_splits_to_csv(html_splits)

# Display or further process each CSV text as needed
for index, csv_text in enumerate(csv_splits):
    print(f"CSV Text for Split {index + 1}:\n{csv_text}\n")