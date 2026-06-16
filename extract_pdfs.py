import PyPDF2
import os

pdf_files = {
    'sudan': 'assets/writing/CalebLoewengart-WritingSampleSudanBlogPost.pdf',
    'armenia': 'assets/writing/CalebLoewengart-WritingSampleArmeniaAzerbaijan.pdf',
    'ai': 'assets/writing/CalebLoewengart-WritingSampleAINegotiation.pdf',
    'ailiteracy': 'assets/writing/CalebLoewengart_AILiteracyStatement (1).pdf'
}

for name, pdf_file in pdf_files.items():
    try:
        with open(pdf_file, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            
            # Write to temp file
            with open(f'assets/writing/{name}_extracted.txt', 'w', encoding='utf-8') as out:
                out.write(text)
            
            print(f"✓ Extracted {name}: {len(text)} characters")
    except Exception as e:
        print(f"✗ Error with {name}: {e}")

print("\nExtraction complete. Files saved to assets/writing/")
