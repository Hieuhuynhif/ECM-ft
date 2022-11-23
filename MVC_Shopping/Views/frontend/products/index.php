<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Public/bootstrap-5.2.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="Public/fontawesome-free-6.2.0-web/css/all.min.css">
    <link rel="stylesheet" href="Public/style/products-index.css">
    <title>Product</title>
</head>
<body>
    <div class="body-page">
        <div class="d-flex flex-column">
<!-- Header--------------------------------------------------------- -->

            <div class="d-flex flex-column header">
                <div class="d-flex flex-row jordan">
                    <div class="d-flex flex-row icon-jordan">
                    <img src="Assets/Home/ImageHome/jordanicon.png" alt="">
                    </div>
                    <div class="sign">
                        <span id="editUser"></span>
                        
                        <span id="editProduct"></span>
                        
                        <span id="findAStore">Find a store</span>
                        |
                        <span id="help">Help</span>
                        |
                        <span id="joinUs">Join Us</span>
                        |
                        <span id="infoSignin"></span>
                        <span id = "signIn"></span>
                    </div>
                </div>

                <div class="d-flex flex-row menu">
                    <div class="icon-nike">
                        <img src="Assets/Home/ImageHome/nikeicon.png" alt="">
                    </div>

                    <div class="menu-option">

                        <span class="select" >Home</span>
                        <span class="select" id="gender=men">Men</span>
                        <span class="select" id="gender=women">Women</span>
                        <span class="select" id="gender=children">Children</span>
                        <div class="d-flex flex-row search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search" id = "search">
                        </div>

                    </div>

                    <div class="menu-cart-heart">
                        <div class="icon-heart" id="btnHeart">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div class="number">
                            <span>Your Favourities:</span>
                            <span id = "numLike">

                            </span>
                        </div>
                        <div class="icon-cart" id="btnCart">
                            <i class="fa-solid fa-cart-flatbed-suitcase"></i>
                        </div>
                        <div class="number">
                            <span>Your cart:</span>
                            <span id = "numCart">

                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
<!--Product And Detail ------------------------------------------------->
                <div class="d-flex flex-row">
                    <div class="d-flex flex-wrap products" id="products">

                    </div>
                    <div class="detail-product">
                        <h1 class="text-break">Detail Item</h1>
                        <br>
                        <p id="detailProduct" class="text-break"></p>
                    </div>  
                </div>
                
            
<!-- Footter ------------------------------------------------->
            <div class="d-flex flex-row footer">
                <div class="d-flex flex-column footer-find">
                    <h6>FIND A STORE</h6>
                    <h6>BECOME A MEMBER</h6>
                    <h6>SIGN UP FOR EMAIL</h6>
                    <h6>SEND US FEEDBACK</h6>
                </div>
                <div class="d-flex flex-column footer-get">
                    <h6>GET HELP</h6>
                    <p>Order Status</p>
                    <p>Delivery</p>
                    <p>Returns</p>
                    <p>Payment Options</p>
                    <p>Contact Us</p>
                </div>
                <div class="d-flex flex-column footer-about">
                    <h6>ABOUT NIKE</h6>
                    <p>News</p>
                    <p>Careers</p>
                    <p>Investors</p>
                    <p>Sustainability</p>
                </div>
                <div class="d-flex flex-row footer-icon">
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-youtube"></i>
                    <i class="fa-brands fa-instagram"></i>
                </div>
            </div>

        </div>
    </div>
    

<!-- Script ------------------------------------------------->
<footer>
    <script src="Public/bootstrap-5.2.2/dist/js/bootstrap.min.js"></script>
    <script src="Public/javascript/products-index.js"></script>
</footer>

</body>
</html>