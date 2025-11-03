import os
import requests
import json

# Define input and output folders
input_folder = "R:/LLM + RAG/tables"  # Folder containing your PDFs
output_folder = "R:/LLM + RAG/Food Composition Tables"  # Folder to save the extracted tables

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Traverse through the PDF files in the input folder
for file_name in os.listdir(input_folder):
    if file_name.endswith(".pdf"):
        # Construct the full path to the PDF file
        pdf_path = os.path.join(input_folder, file_name)

        # Create the corresponding .xlsx file name
        excel_file_name = file_name.replace(' ', '_').replace('.pdf', '.xlsx')
        output_path = os.path.join(output_folder, excel_file_name)

        # Make the API request to extract the table
        with open(pdf_path, 'rb') as pdf_file:
            response = requests.post(
                'https://api.pspdfkit.com/build',
                headers={
                    'Authorization': 'Bearer pdf_live_VE51HYHKTtYNA6XXzaLiqmpHJDihGp6CBYuBeWtZHyP'
                },
                files={
                    'file': pdf_file
                },
                data={
                    'instructions': json.dumps({
                        'parts': [
                            {
                                'file': 'file'
                            }
                        ],
                        'output': {
                            'type': 'xlsx'
                        }
                    })
                },
                stream=True
            )

            # Check if the request was successful
            if response.ok:
                # Save the result to the output folder
                with open(output_path, 'wb') as fd:
                    for chunk in response.iter_content(chunk_size=8096):
                        fd.write(chunk)
                print(f"Saved: {output_path}")
            else:
                print(f"Failed to extract table from {file_name}: {response.text}")
