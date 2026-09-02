import fitz
import winocr
import asyncio
from PIL import Image
import json
import os
import re

# Exact lesson mapping based on Table of Contents:
lessons_map = [
    # Unit 1
    {"unitId": "unit-1", "lessonId": "u1-l1", "title": "The Parrot's Tale", "startPage": 7, "endPage": 12},
    {"unitId": "unit-1", "lessonId": "u1-l2", "title": "Education and Technology", "startPage": 13, "endPage": 19},
    {"unitId": "unit-1", "lessonId": "u1-l3", "title": "Children in School", "startPage": 20, "endPage": 30},
    {"unitId": "unit-1", "lessonId": "u1-l4", "title": "Civic Engagement", "startPage": 31, "endPage": 35},
    
    # Unit 2
    {"unitId": "unit-2", "lessonId": "u2-l1", "title": "What is Beauty?", "startPage": 36, "endPage": 39},
    {"unitId": "unit-2", "lessonId": "u2-l2", "title": "Folk Music", "startPage": 40, "endPage": 46},
    {"unitId": "unit-2", "lessonId": "u2-l3", "title": "Art", "startPage": 47, "endPage": 52},
    {"unitId": "unit-2", "lessonId": "u2-l4", "title": "Craft", "startPage": 53, "endPage": 56},

    # Unit 3
    {"unitId": "unit-3", "lessonId": "u3-l1", "title": "Myths of Bengal", "startPage": 57, "endPage": 60},
    {"unitId": "unit-3", "lessonId": "u3-l2", "title": "Icarus", "startPage": 61, "endPage": 65},
    {"unitId": "unit-3", "lessonId": "u3-l3", "title": "The Legend of Gazi", "startPage": 66, "endPage": 67},
    {"unitId": "unit-3", "lessonId": "u3-l4", "title": "Khona", "startPage": 68, "endPage": 70},

    # Unit 4: EXCLUDED

    # Unit 5
    {"unitId": "unit-5", "lessonId": "u5-l1", "title": "Are We Aware of These Rights-I?", "startPage": 94, "endPage": 96},
    {"unitId": "unit-5", "lessonId": "u5-l2", "title": "Are We Aware of These Rights-II?", "startPage": 97, "endPage": 99},
    {"unitId": "unit-5", "lessonId": "u5-l3", "title": "Rights to Health and Education", "startPage": 100, "endPage": 101},
    {"unitId": "unit-5", "lessonId": "u5-l4", "title": "Coal Miners", "startPage": 102, "endPage": 104},
    {"unitId": "unit-5", "lessonId": "u5-l5", "title": "Frederick Douglass", "startPage": 105, "endPage": 109},

    # Unit 6
    {"unitId": "unit-6", "lessonId": "u6-l1", "title": "What is a Dream?", "startPage": 110, "endPage": 114},
    {"unitId": "unit-6", "lessonId": "u6-l2", "title": "Dreams in Literature", "startPage": 115, "endPage": 119},

    # Unit 7
    {"unitId": "unit-7", "lessonId": "u7-l1", "title": "Brojen Das: On Crossing the English Channel", "startPage": 120, "endPage": 123},
    {"unitId": "unit-7", "lessonId": "u7-l2", "title": "Scaling a Mountain Peak", "startPage": 124, "endPage": 126},
    {"unitId": "unit-7", "lessonId": "u7-l3", "title": "The Unbeaten Girls", "startPage": 127, "endPage": 131},

    # Unit 8
    {"unitId": "unit-8", "lessonId": "u8-l1", "title": "Family Relationship", "startPage": 132, "endPage": 134},
    {"unitId": "unit-8", "lessonId": "u8-l2", "title": "Warmth in Relationships", "startPage": 135, "endPage": 137},
    {"unitId": "unit-8", "lessonId": "u8-l3", "title": "A Mother in Mannville", "startPage": 138, "endPage": 147},
    {"unitId": "unit-8", "lessonId": "u8-l4", "title": "Love", "startPage": 148, "endPage": 152},

    # Unit 9
    {"unitId": "unit-9", "lessonId": "u9-l1", "title": "Storm and Stresses of Adolescence", "startPage": 153, "endPage": 156},
    {"unitId": "unit-9", "lessonId": "u9-l2", "title": "Adolescence and Some (Related) Problems in Bangladesh", "startPage": 157, "endPage": 161},
    {"unitId": "unit-9", "lessonId": "u9-l3", "title": "The Story of Shilpi", "startPage": 162, "endPage": 166},
    {"unitId": "unit-9", "lessonId": "u9-l4", "title": "Say 'No' to Bullying", "startPage": 167, "endPage": 176},

    # Unit 10
    {"unitId": "unit-10", "lessonId": "u10-l1", "title": "Manners around the World", "startPage": 177, "endPage": 183},
    {"unitId": "unit-10", "lessonId": "u10-l2", "title": "Etiquette Netiquette", "startPage": 184, "endPage": 186},
    {"unitId": "unit-10", "lessonId": "u10-l3", "title": "Food and Culture", "startPage": 187, "endPage": 190},
    {"unitId": "unit-10", "lessonId": "u10-l4", "title": "Fitness", "startPage": 191, "endPage": 195},
    {"unitId": "unit-10", "lessonId": "u10-l5", "title": "Consumerism", "startPage": 196, "endPage": 198},

    # Unit 11
    {"unitId": "unit-11", "lessonId": "u11-l1", "title": "Situations of Conflict", "startPage": 199, "endPage": 202},
    {"unitId": "unit-11", "lessonId": "u11-l2", "title": "\"The Old Man at the Bridge\" by Ernest Hemingway", "startPage": 203, "endPage": 207},
    {"unitId": "unit-11", "lessonId": "u11-l3", "title": "Stories From Gaza", "startPage": 208, "endPage": 213},
    {"unitId": "unit-11", "lessonId": "u11-l4", "title": "Peace in Literature", "startPage": 214, "endPage": 218},
    {"unitId": "unit-11", "lessonId": "u11-l5", "title": "Opinions through images", "startPage": 219, "endPage": 223},

    # Unit 12
    {"unitId": "unit-12", "lessonId": "u12-l1", "title": "Water, Water Everywhere...", "startPage": 224, "endPage": 226},
    {"unitId": "unit-12", "lessonId": "u12-l2", "title": "The Greta Effect", "startPage": 227, "endPage": 229},
    {"unitId": "unit-12", "lessonId": "u12-l3", "title": "Endangered Species", "startPage": 230, "endPage": 235},
    {"unitId": "unit-12", "lessonId": "u12-l4", "title": "What is Environmental Justice?", "startPage": 236, "endPage": 240},
    {"unitId": "unit-12", "lessonId": "u12-l5", "title": "Limits of the Scientific Method", "startPage": 241, "endPage": 246}
]

async def ocr_page(doc, page_num):
    pix = doc[page_num - 1].get_pixmap(dpi=150)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    res = await winocr.recognize_pil(img, 'en')
    return res.text

async def main():
    doc = fitz.open(r'C:\Users\infinix\Downloads\English 11-12 com_11zon.pdf')
    results = []
    
    print(f'Starting extraction for {len(lessons_map)} lessons...')
    
    for idx, item in enumerate(lessons_map):
        lesson_text_parts = []
        for p in range(item['startPage'], item['endPage'] + 1):
            text = await ocr_page(doc, p)
            lesson_text_parts.append(f'--- PAGE {p} ---\n' + text)
        
        full_text = '\n\n'.join(lesson_text_parts)
        results.append({
            'unitId': item['unitId'],
            'lessonId': item['lessonId'],
            'title': item['title'],
            'startPage': item['startPage'],
            'endPage': item['endPage'],
            'text': full_text
        })
        print(f"[{idx+1}/{len(lessons_map)}] Extracted {item['lessonId']}: {item['title']} ({len(full_text)} chars)")
    
    out_file = r'e:\english leaner\temp_extracted_lessons.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f'Done! Successfully saved all {len(results)} lessons to {out_file}')

if __name__ == '__main__':
    asyncio.run(main())
