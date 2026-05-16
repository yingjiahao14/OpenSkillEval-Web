import re
import sys

def check_html(filename):
    with open(f"/app/output/{filename}", "r") as f:
        content = f.read()

    missing = []
    if filename == "store.html":
        ids = ["carousel-latest", "carousel-help", "carousel-difference", "carousel-accessories", "carousel-audio", "carousel-savings"]
    elif filename == "index.html":
        ids = ["tab-streaming", "tab-fitness", "tab-gaming", "tab-music", "carousel-streaming", "carousel-fitness", "carousel-gaming", "carousel-music"]
    elif filename == "shop-laptops.html":
        ids = ["carousel-laptops", "all-models", "shopping-guides", "ways-to-save", "store-difference", "accessories", "setup-support", "special-stores", "product-experience"]
    elif filename == "shop-tablets.html":
        ids = ["carousel-tablets", "all-models", "shopping-guides", "ways-to-save", "store-difference", "accessories", "setup-support", "special-stores", "product-experience"]
    else:
        return []
    
    for _id in ids:
        if f'id="{_id}"' not in content:
            missing.append(_id)
    return missing

for page in ["index.html", "store.html", "shop-laptops.html", "shop-tablets.html"]:
    missing = check_html(page)
    if missing:
        print(f"{page} is missing IDs: {missing}")
    else:
        print(f"{page}: All IDs present")
