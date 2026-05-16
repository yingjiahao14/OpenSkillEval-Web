import os
import json

def get_shared_head(title):
    return f"""
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="shared.css">
    """

def get_nav():
    return """
    <nav class="global-nav">
        <div class="nav-content">
            <a href="index.html" class="logo"><strong>Orchard</strong></a>
            <a href="store.html">Store</a>
            <a href="shop-laptops.html">Laptops</a>
            <a href="shop-tablets.html">Tablets</a>
            <a href="#">Phones</a>
            <a href="#">Accessories</a>
            <a href="#">Support</a>
        </div>
    </nav>
    """

def get_footer():
    return """
    <footer>
        <div class="footer-links">
            <div class="footer-col">
                <h4>Shop and Learn</h4>
                <ul>
                    <li><a href="store.html">Store</a></li>
                    <li><a href="shop-laptops.html">Laptop</a></li>
                    <li><a href="shop-tablets.html">Tablet</a></li>
                    <li><a href="#">Phone</a></li>
                    <li><a href="#">Smartwatch</a></li>
                    <li><a href="#">Accessories</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Orchard Music</a></li>
                    <li><a href="#">Orchard TV+</a></li>
                    <li><a href="#">Orchard Fitness+</a></li>
                    <li><a href="#">Orchard News+</a></li>
                    <li><a href="#">Orchard Arcade</a></li>
                    <li><a href="#">Orchard One</a></li>
                    <li><a href="#">Orchard Card</a></li>
                    <li><a href="#">Orchard Books</a></li>
                    <li><a href="#">Orchard Podcasts</a></li>
                    <li><a href="#">Orchard Store</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Account</h4>
                <ul>
                    <li><a href="#">Manage Your Account</a></li>
                    <li><a href="#">Orchard Store Account</a></li>
                    <li><a href="#">Cloud.com</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Orchard Store</h4>
                <ul>
                    <li><a href="#">Find a Store</a></li>
                    <li><a href="#">Genius Bar</a></li>
                    <li><a href="#">Today at Orchard</a></li>
                    <li><a href="#">Orchard Camp</a></li>
                    <li><a href="#">Orchard Store App</a></li>
                    <li><a href="#">Refurbished and Clearance</a></li>
                    <li><a href="#">Financing</a></li>
                    <li><a href="#">Orchard Trade In</a></li>
                    <li><a href="#">Order Status</a></li>
                    <li><a href="#">Shopping Help</a></li>
                </ul>
            </div>
        </div>
        <div class="legal">
            <p>Copyright © 2026 Orchard Inc. All rights reserved.</p>
            <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal | Site Map</p>
        </div>
    </footer>
    <script src="shared.js"></script>
    """

def generate_index():
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    {get_shared_head("Orchard")}
</head>
<body>
    {get_nav()}
    <div class="page-wrapper">
        <div class="ribbon-banner">
            Recycle an eligible device in a store and get 10% off an Orchard accessory. <a href="#">Find a store &rarr;</a>
        </div>
        
        <div class="homepage-product-grid">
            <div class="hero-tile dark-theme">
                <div class="hero-bg" style="background: linear-gradient(180deg, #1d1d1f, #000);"></div>
                <div class="hero-content">
                    <h2>Phone</h2>
                    <h3>Meet the latest Phone lineup.</h3>
                    <div class="hero-links">
                        <a href="#" class="btn btn-primary">Learn more</a>
                        <a href="#" class="btn btn-secondary">Buy</a>
                    </div>
                </div>
            </div>
            <div class="hero-tile light-theme">
                <div class="hero-bg" style="background: linear-gradient(180deg, #f5f5f7, #e5e5ea);"></div>
                <div class="hero-content">
                    <h2>Laptop Neo</h2>
                    <h3>Amazing Laptop. Surprising price.</h3>
                    <div class="hero-links">
                        <a href="#" class="btn btn-primary">Learn more</a>
                        <a href="#" class="btn btn-secondary">Buy</a>
                    </div>
                </div>
            </div>
            <div class="hero-tile-grid">
                <div class="hero-tile light-theme half">
                    <div class="hero-bg" style="background: linear-gradient(180deg, #f5f5f7, #e5e5ea);"></div>
                    <div class="hero-content">
                        <h2>Tablet Pro</h2>
                        <h3>Advanced AI performance and game-changing capabilities.</h3>
                        <div class="hero-links">
                            <a href="#" class="btn btn-primary">Learn more</a>
                            <a href="#" class="btn btn-secondary">Buy</a>
                        </div>
                    </div>
                </div>
                <div class="hero-tile dark-theme half">
                    <div class="hero-bg" style="background: linear-gradient(180deg, #1d1d1f, #000);"></div>
                    <div class="hero-content">
                        <h2>Laptop Pro</h2>
                        <h3>Now with O5, O5 Pro, and O5 Max.</h3>
                        <div class="hero-links">
                            <a href="#" class="btn btn-primary">Learn more</a>
                            <a href="#" class="btn btn-secondary">Buy</a>
                        </div>
                    </div>
                </div>
                <div class="hero-tile light-theme half">
                    <div class="hero-bg" style="background: linear-gradient(180deg, #f5f5f7, #e5e5ea);"></div>
                    <div class="hero-content">
                        <h2>Earbuds Pro 3</h2>
                        <h3>The world's best in-ear Active Noise Cancellation.</h3>
                        <div class="hero-links">
                            <a href="#" class="btn btn-primary">Learn more</a>
                            <a href="#" class="btn btn-secondary">Buy</a>
                        </div>
                    </div>
                </div>
                <div class="hero-tile light-theme half">
                    <div class="hero-bg" style="background: linear-gradient(180deg, #f5f5f7, #e5e5ea);"></div>
                    <div class="hero-content">
                        <h2>Trade In</h2>
                        <h3>Get up to $195–$685 in credit when you trade in Phone 13 or higher.</h3>
                        <div class="hero-links">
                            <a href="#" class="btn btn-primary">Learn more</a>
                            <a href="#" class="btn btn-secondary">Buy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="section-pad entertainment-section">
            <div class="container">
                <div class="carousel-header">
                    <h2>Endless entertainment.</h2>
                </div>
                <div class="tabs">
                    <button class="tab-btn active" data-target="tab-streaming">Streaming</button>
                    <button class="tab-btn" data-target="tab-fitness">Fitness</button>
                    <button class="tab-btn" data-target="tab-gaming">Gaming</button>
                    <button class="tab-btn" data-target="tab-music">Music</button>
                </div>
                <div class="tab-content active" id="tab-streaming">
                    <div class="carousel-track">
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Morning Show</h3><p>Stream now</p></div>
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Ted Lasso</h3><p>Stream now</p></div>
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Severance</h3><p>Stream now</p></div>
                    </div>
                </div>
                <div class="tab-content" id="tab-fitness">
                    <div class="carousel-track">
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>HIIT with Kim</h3><p>Play now</p></div>
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Yoga with Jessica</h3><p>Play now</p></div>
                    </div>
                </div>
                <div class="tab-content" id="tab-gaming">
                    <div class="carousel-track">
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Oceanhorn 2</h3><p>Play now</p></div>
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Sneaky Sasquatch</h3><p>Play now</p></div>
                    </div>
                </div>
                <div class="tab-content" id="tab-music">
                    <div class="carousel-track">
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>Today's Hits</h3><p>Listen now</p></div>
                        <div class="card card-ent"><div class="card-img-placeholder"></div><h3>A-List Pop</h3><p>Listen now</p></div>
                    </div>
                </div>
            </div>
        </section>

    </div>
    {get_footer()}
</body>
</html>"""
    with open('/app/output/index.html', 'w') as f:
        f.write(html)

def generate_store():
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    {get_shared_head("Orchard Store")}
</head>
<body>
    {get_nav()}
    <div class="page-wrapper">
        <section class="store-hero hero">
            <div class="container">
                <h1>Store</h1>
                <p>The best way to buy the products you love.</p>
                <div class="hero-links">
                    <a href="#" class="btn btn-secondary">Connect with a Specialist</a>
                    <a href="#" class="btn btn-secondary">Find an Orchard Store</a>
                </div>
            </div>
        </section>

        <section class="product-icon-bar section-pad-sm">
            <div class="container">
                <div class="carousel-track icon-track">
                    <a href="shop-laptops.html" class="icon-item"><div class="icon-img"></div><span>Laptop</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Phone</span></a>
                    <a href="shop-tablets.html" class="icon-item"><div class="icon-img"></div><span>Tablet</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Smartwatch</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Headphones</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Tracker</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Streaming Box</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Smart Speaker</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Accessories</span></a>
                    <a href="#" class="icon-item"><div class="icon-img"></div><span>Orchard Gift Card</span></a>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>The latest. <br><span>Take a look at what's new, right now.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card card-large">
                        <div class="card-img-placeholder"></div>
                        <div class="card-content">
                            <div class="badge">New</div>
                            <h3>Phone 17 Pro</h3>
                            <p>All out Pro.</p>
                            <div class="price-block">
                                <div>From $1099</div>
                                <div>$45.79/mo. for 24 mo.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card card-large">
                        <div class="card-img-placeholder"></div>
                        <div class="card-content">
                            <div class="badge">New</div>
                            <h3>Laptop Neo</h3>
                            <p>The magic of Laptop at a surprising price.</p>
                            <div class="price-block">
                                <div>From $599</div>
                                <div>$49.91/mo. for 12 mo.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card card-large">
                        <div class="card-img-placeholder"></div>
                        <div class="card-content">
                            <div class="badge">New</div>
                            <h3>Phone 17e</h3>
                            <p>Feature stacked. Value packed.</p>
                            <div class="price-block">
                                <div>From $549</div>
                                <div>$22.87/mo. for 24 mo.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card card-large">
                        <div class="card-img-placeholder"></div>
                        <div class="card-content">
                            <div class="badge">New</div>
                            <h3>Headphones Max 2</h3>
                            <p>New intelligent features. More immersive listening.</p>
                            <div class="price-block">
                                <div>$549</div>
                                <div>$91.50/mo. for 6 mo.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card card-large">
                        <div class="card-img-placeholder"></div>
                        <div class="card-content">
                            <div class="badge">New</div>
                            <h3>Laptop Pro</h3>
                            <p>Now with O5, O5 Pro, and O5 Max.</p>
                            <div class="price-block">
                                <div>From $1699</div>
                                <div>$141.58/mo. for 12 mo.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Help is here. <br><span>Whenever and however you need it.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card"><div class="card-img-placeholder"></div><h3>Orchard Specialist</h3><p>Shop one on one with a Specialist.</p></div>
                    <div class="card"><div class="card-img-placeholder"></div><h3>Video Shopping</h3><p>Choose your next device in a guided video session.</p></div>
                    <div class="card"><div class="card-img-placeholder"></div><h3>Today at Orchard</h3><p>Join free sessions to explore features.</p></div>
                    <div class="card"><div class="card-img-placeholder"></div><h3>Personal Setup</h3><p>Set up your new device with help from a Specialist.</p></div>
                    <div class="card"><div class="card-img-placeholder"></div><h3>Genius Bar</h3><p>Get expert service and support.</p></div>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>The Orchard Store difference. <br><span>Even more reasons to shop with us.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card"><h3>Trade-In</h3><p>Trade in your current device. Get credit toward a new one.</p></div>
                    <div class="card"><h3>Flexible Payment</h3><p>Pay in full or pay over time. Your choice.</p></div>
                    <div class="card"><h3>Personalization</h3><p>Engrave a mix of emoji, names, and numbers for free.</p></div>
                    <div class="card"><h3>Fast Delivery</h3><p>Enjoy two-hour delivery from an Orchard Store, free delivery, or easy pickup.</p></div>
                    <div class="card"><h3>Store App</h3><p>Get a personalized shopping experience in the app.</p></div>
                    <div class="card"><h3>Customization</h3><p>Customize a Laptop and style a Smartwatch just for them.</p></div>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Accessories. <br><span>Essentials that pair perfectly with your favorite devices.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Phone 17 Pro Silicone Case</h3><p>$49.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Crossbody Strap</h3><p>$59.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>MagCharge Charger</h3><p>$39.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Magic Keyboard for Tablet Air</h3><p>$319.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Phone Air Battery Pack</h3><p>$99.00</p></div>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Loud and clear. <br><span>Unparalleled choices for rich, high-quality sound.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Headphones Max 2</h3><p>$549.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Earbuds Pro 3</h3><p>$249.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Earbuds 4 with ANC</h3><p>$179.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>PowerBuds Pro 2</h3><p>$299.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>SmartSpeaker mini</h3><p>$99.00</p></div>
                </div>
            </div>
        </section>
        
        <section class="section-pad">
            <div class="container">
                <div class="hero-tile dark-theme" style="height: 400px; border-radius: 24px; padding: 40px; background: linear-gradient(135deg, #1d1d1f, #000);">
                    <div class="hero-content">
                        <h2>Athletica × SoundPro. Sport with style.</h2>
                        <h3>Two icons join forces to level up your workout.</h3>
                        <a href="#" class="btn btn-primary" style="margin-top: 16px;">Explore the collection</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Savings and offers. <br><span>Exclusive deals, special stores and more.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card"><h3>Carrier Deals</h3><p>Get up to $800–$1,100 in credit on a new Phone after trade-in.</p></div>
                    <div class="card"><h3>Education</h3><p>Buy a new Laptop or Tablet with education savings.</p></div>
                    <div class="card"><h3>Certified Refurbished</h3><p>Shop refurbished products backed by a one-year warranty.</p></div>
                    <div class="card"><h3>Small Business</h3><p>Simple solutions for all the ways you work.</p></div>
                    <div class="card"><h3>Government</h3><p>Special pricing for state, local, and federal agencies.</p></div>
                </div>
            </div>
        </section>
        
        <section class="section-pad">
            <div class="container text-center">
                <h2>Quick Links</h2>
                <div class="quick-links">
                    <button class="btn btn-secondary">Find a Store</button>
                    <button class="btn btn-secondary">Order Status</button>
                    <button class="btn btn-secondary">Shopping Help</button>
                    <button class="btn btn-secondary">Returns</button>
                    <button class="btn btn-secondary">Your Saves</button>
                </div>
            </div>
        </section>

    </div>
    {get_footer()}
</body>
</html>"""
    with open('/app/output/store.html', 'w') as f:
        f.write(html)

def generate_shop(category):
    is_laptop = category == "laptops"
    title = "Shop Laptops" if is_laptop else "Shop Tablets"
    hero_title = "Laptop" if is_laptop else "Tablet"
    
    models = []
    if is_laptop:
        models = [
            {"name": "Laptop Neo", "price": "From $599", "mo": "$49.91/mo. for 12 mo."},
            {"name": "Laptop Air", "price": "From $1099", "mo": "$91.58/mo. for 12 mo."},
            {"name": "Laptop Pro", "price": "From $1699", "mo": "$141.58/mo. for 12 mo."},
            {"name": "Desktop One", "price": "From $1299", "mo": "$108.25/mo. for 12 mo."},
            {"name": "Desktop Studio", "price": "From $1999", "mo": "$166.58/mo. for 12 mo."}
        ]
    else:
        models = [
            {"name": "Tablet Pro", "price": "From $999", "mo": "$83.25/mo. for 12 mo."},
            {"name": "Tablet Air", "price": "From $599", "mo": "$49.91/mo. for 12 mo."},
            {"name": "Tablet", "price": "From $349", "mo": "$29.08/mo. for 12 mo."},
            {"name": "Tablet mini", "price": "From $499", "mo": "$41.58/mo. for 12 mo."}
        ]
    
    models_html = ""
    for m in models:
        models_html += f"""
        <div class="card">
            <div class="card-img-placeholder"></div>
            <h3>{m["name"]}</h3>
            <div class="price-block">
                <div>{m["price"]}</div>
                <div>{m["mo"]}</div>
            </div>
            <div class="card-footer"><button class="btn btn-primary">Buy</button></div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    {get_shared_head(title)}
</head>
<body>
    {get_nav()}
    
    <div class="section-nav">
        <a href="#all-models">All Models</a>
        <a href="#shopping-guides">Shopping Guides</a>
        <a href="#ways-to-save">Ways to Save</a>
        <a href="#accessories">Accessories</a>
    </div>

    <div class="page-wrapper" style="padding-top: 88px;">
        <section class="hero">
            <div class="container">
                <h1>{hero_title}</h1>
                <p>All models. Take your pick.</p>
            </div>
        </section>

        <section id="all-models" class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>All models. <br><span>Take your pick.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    {models_html}
                </div>
            </div>
        </section>

        <section id="shopping-guides" class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Shopping guides. <br><span>Can't decide? Start here.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card"><h3>Compare All Models</h3><p>Which {hero_title.lower()} is right for you?</p></div>
                    <div class="card"><h3>Orchard Intelligence</h3><p>Create, communicate, and get things done effortlessly.</p></div>
                    <div class="card"><h3>Video Shopping</h3><p>Choose your next device in a guided, one-way video session.</p></div>
                    <div class="card"><h3>Specialist</h3><p>Shop one on one with a Specialist.</p></div>
                </div>
            </div>
        </section>

        <section id="ways-to-save" class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Ways to save. <br><span>Find what works for you.</span></h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card"><h3>Orchard Trade In</h3><p>Save on a new device when you trade in an eligible device.</p></div>
                    <div class="card"><h3>Low Monthly Payments</h3><p>Pay 0% APR over 12 months with Orchard Card.</p></div>
                    <div class="card"><h3>Orchard Card</h3><p>Get 3% back in Daily Cash.</p></div>
                    <div class="card"><h3>Education Pricing</h3><p>Save with education pricing on the Education Store.</p></div>
                </div>
            </div>
        </section>

        <section id="accessories" class="section-pad">
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2>Accessories.</h2>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev-btn">&lt;</button>
                        <button class="carousel-btn next-btn">&gt;</button>
                    </div>
                </div>
                <div class="carousel-track">
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Magic Keyboard</h3><p>$319.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Stylus Pen</h3><p>$129.00</p></div>
                    <div class="card card-accessory"><div class="card-img-placeholder"></div><h3>Sleeve Case</h3><p>$79.00</p></div>
                </div>
            </div>
        </section>
        
    </div>
    {get_footer()}
</body>
</html>"""
    filename = '/app/output/shop-laptops.html' if is_laptop else '/app/output/shop-tablets.html'
    with open(filename, 'w') as f:
        f.write(html)

def generate_assets():
    css = """
:root {
  --bg-color: oklch(98.5% 0.005 265);
  --card-bg: oklch(100% 0 0);
  --text-primary: oklch(25% 0.01 265);
  --text-secondary: oklch(50% 0.01 265);
  --accent-color: oklch(55% 0.2 260); /* blue */
  --border-color: oklch(90% 0.01 265);
  --radius-sm: 8px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 48px;
  --spacing-7: 64px;
  --spacing-8: 96px;
  
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--card-bg);
  color: var(--text-primary);
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: var(--text-primary);
}
a:hover {
  text-decoration: underline;
}
button {
  cursor: pointer;
  font-family: inherit;
}

/* Nav */
.global-nav {
  height: 44px;
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}
.nav-content {
  display: flex;
  gap: var(--spacing-4);
  max-width: 1000px;
  width: 100%;
  padding: 0 var(--spacing-3);
  font-size: 12px;
}
.nav-content a {
  color: var(--text-primary);
  opacity: 0.8;
}
.nav-content a:hover {
  opacity: 1;
  text-decoration: none;
}
.section-nav {
  height: 44px;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  gap: var(--spacing-4);
  font-size: 14px;
}
.section-nav a {
  opacity: 0.8;
}
.section-nav a:hover {
  opacity: 1;
}

.page-wrapper {
  padding-top: 44px;
}
.ribbon-banner {
  background: var(--bg-color);
  padding: var(--spacing-2);
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid var(--border-color);
}
.ribbon-banner a {
  color: var(--accent-color);
}

/* Typography */
h1, h2, h3 {
  font-weight: 600;
  letter-spacing: -0.01em;
}
.text-center { text-align: center; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border: none;
}
.btn-primary {
  background-color: var(--accent-color);
  color: white;
}
.btn-primary:hover {
  text-decoration: none;
  background-color: oklch(50% 0.2 260);
}
.btn-secondary {
  background-color: oklch(95% 0.01 265);
  color: var(--text-primary);
}
.btn-secondary:hover {
  background-color: oklch(90% 0.01 265);
  text-decoration: none;
}
.btn-link {
  color: var(--accent-color);
  background: none;
  font-size: 17px;
}
.quick-links {
  display: flex;
  gap: var(--spacing-3);
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--spacing-4);
}

/* Layouts */
.section-pad {
  padding: var(--spacing-7) var(--spacing-4);
}
.section-pad-sm {
  padding: var(--spacing-5) var(--spacing-4);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero */
.hero {
  text-align: center;
  padding: var(--spacing-8) var(--spacing-4);
  background-color: var(--bg-color);
}
.hero h1 {
  font-size: 56px;
  margin-bottom: var(--spacing-2);
}
.hero p {
  font-size: 24px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-4);
}
.hero-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-3);
}

/* Homepage Grid */
.homepage-product-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  max-width: 1400px;
  margin: 0 auto;
}
.hero-tile {
  position: relative;
  height: 600px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: var(--spacing-6);
  text-align: center;
}
.hero-tile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3);
}
@media (max-width: 768px) {
  .hero-tile-grid {
    grid-template-columns: 1fr;
  }
}
.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}
.hero-content h2 {
  font-size: 48px;
  margin-bottom: var(--spacing-1);
}
.hero-content h3 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: var(--spacing-3);
}
.dark-theme .hero-content { color: white; }
.light-theme .hero-content { color: var(--text-primary); }

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-5);
  border-bottom: 1px solid var(--border-color);
}
.tab-btn {
  background: none;
  border: none;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: 18px;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
}
.tab-btn.active {
  color: var(--text-primary);
  border-bottom-color: var(--text-primary);
}
.tab-content { display: none; }
.tab-content.active { display: block; }

/* Carousel */
.carousel-container {
  position: relative;
  width: 100%;
}
.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-4);
  padding: 0 var(--spacing-4);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.carousel-header h2 {
  font-size: 28px;
}
.carousel-header h2 span {
  color: var(--text-secondary);
}
.carousel-nav {
  display: flex;
  gap: var(--spacing-2);
}
.carousel-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-color);
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  opacity: 0.8;
}
.carousel-btn:hover {
  opacity: 1;
  background: var(--border-color);
}
.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 0 var(--spacing-4) var(--spacing-4) calc(50vw - 600px);
  gap: var(--spacing-4);
}
@media (max-width: 1200px) {
  .carousel-track {
    padding-left: var(--spacing-4);
  }
}
.carousel-track::-webkit-scrollbar {
  display: none;
}
.icon-track {
  justify-content: flex-start;
  gap: var(--spacing-5);
  padding-bottom: var(--spacing-2);
}
@media (min-width: 1200px) {
  .icon-track {
    justify-content: center;
    padding-left: 0;
  }
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  font-size: 14px;
  color: var(--text-primary);
  flex-shrink: 0;
}
.icon-item:hover { text-decoration: none; color: var(--accent-color); }
.icon-img {
  width: 60px; height: 60px;
  background: var(--bg-color);
  border-radius: 50%;
}
.card {
  scroll-snap-align: start;
  flex: 0 0 320px;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-5);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.02);
}
.card-large {
  flex: 0 0 400px;
  height: 500px;
  padding: var(--spacing-6);
  justify-content: flex-start;
}
.card-accessory, .card-ent {
  flex: 0 0 280px;
}
.card-img-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, oklch(95% 0.01 265), oklch(90% 0.02 265));
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
}
.card-large .card-img-placeholder {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  height: 100%;
  border-radius: var(--radius-lg);
  z-index: 1;
  background: linear-gradient(to bottom, oklch(98% 0.005 265), oklch(92% 0.01 265));
}
.card-content {
  position: relative;
  z-index: 2;
}
.badge {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}
.card h3 {
  font-size: 24px;
  margin-bottom: var(--spacing-2);
}
.card p {
  font-size: 14px;
  color: var(--text-secondary);
  flex-grow: 1;
}
.card .price-block {
  margin-top: var(--spacing-4);
  font-size: 14px;
}
.card .price-block div {
  margin-bottom: var(--spacing-1);
}
.card .card-footer {
  margin-top: var(--spacing-4);
}

/* Footer */
footer {
  background-color: var(--bg-color);
  padding: var(--spacing-6) var(--spacing-4);
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: var(--spacing-8);
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-4);
  max-width: 1000px;
  margin: 0 auto var(--spacing-6);
}
.footer-col h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
}
.footer-col ul {
  list-style: none;
}
.footer-col ul li {
  margin-bottom: var(--spacing-1);
}
.footer-col a {
  color: var(--text-secondary);
}
.footer-col a:hover {
  text-decoration: underline;
}
/* Mobile footer accordion */
@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .footer-col {
    border-bottom: 1px solid var(--border-color);
  }
  .footer-col h4 {
    padding: var(--spacing-2) 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-col h4::after {
    content: '+';
    font-size: 16px;
  }
  .footer-col.active h4::after {
    content: '−';
  }
  .footer-col ul {
    display: none;
    padding-bottom: var(--spacing-2);
  }
  .footer-col.active ul {
    display: block;
  }
}
.legal {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}
@media (max-width: 768px) {
  .legal {
    flex-direction: column;
    gap: var(--spacing-2);
  }
}
"""
    with open('/app/output/shared.css', 'w') as f:
        f.write(css)
    
    js = """
document.addEventListener('DOMContentLoaded', () => {
    // Carousels
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prev = container.querySelector('.prev-btn');
        const next = container.querySelector('.next-btn');
        
        if (track && prev && next) {
            prev.addEventListener('click', () => {
                track.scrollBy({ left: -340, behavior: 'smooth' });
            });
            next.addEventListener('click', () => {
                track.scrollBy({ left: 340, behavior: 'smooth' });
            });
        }
    });

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // reset all
            const tabs = btn.closest('.tabs');
            if (tabs) {
                tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            }
            const section = btn.closest('.entertainment-section') || document;
            section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // set active
            btn.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Footer Accordion
    const footerCols = document.querySelectorAll('.footer-col');
    if (window.innerWidth <= 768) {
        footerCols.forEach(col => {
            const h4 = col.querySelector('h4');
            if (h4) {
                h4.addEventListener('click', () => {
                    col.classList.toggle('active');
                });
            }
        });
    }
    
    // Smooth scroll for section nav
    document.querySelectorAll('.section-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const y = targetEl.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });
});
"""
    with open('/app/output/shared.js', 'w') as f:
        f.write(js)

def build():
    generate_assets()
    generate_index()
    generate_store()
    generate_shop("laptops")
    generate_shop("tablets")

build()
