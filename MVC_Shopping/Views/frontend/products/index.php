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
        <div class="container">

            <div class="row row-cols-1 header">
                <div class="col jordan">
                    <div class="row">
                        <div class="col-12 col-sm-2 icon-jordan">
                            <img src="Assets/Home/ImageHome/jordanicon.png" alt="">
                        </div>
                        <div class="col-12 col-sm-10 sign">
                            <span id="editUser"></span>
                            
                            <span id="editProduct"></span>

                            <span id="infoSignin"></span>
                            <span id = "signIn"></span>
                        </div>
                    </div>
                </div>

                <div class="col menu">
                    <div class="row">
                        <div class="col-12 col-sm-2 icon-nike">
                            <img src="Assets/Home/ImageHome/nikeicon.png" alt="">
                        </div>
                        <div class="col-12 col-sm-10 col-lg-4 menu-option">
                            <span class="select" >Home</span>
                            <span class="select" id="gender=men">Men</span>
                            <span class="select" id="gender=women">Women</span>
                            <span class="select" id="gender=children">Children</span>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3 search">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="Search" id = "search">
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3 menu-cart-heart">
                            <div class="icon-heart" id="btnHeart">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="number">
                                <span>Your Favourite:</span>
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
            </div>
            
            <div class="row ">
                <div class="col-12 col-lg-9 " >
                    <div class="row products" id="products">

                    </div>
                </div>
                <div class="col-12 col-lg-3 detail-product">
                    <h1 class="text-break">Detail Item</h1>
                    <br>
                    <p id="detailProduct" class="text-break"></p>
                </div>  
            </div>
                
            
            <div class="row footer">
                <div class="col-12 col-md-4 col-lg-2 d-flex flex-column footer-find">
                    <h6>FIND A STORE</h6>
                    <h6>BECOME A MEMBER</h6>
                    <h6>SIGN UP FOR EMAIL</h6>
                    <h6>SEND US FEEDBACK</h6>
                </div>
                <div class="col-12 col-md-4 col-lg-2 d-flex flex-column footer-get">
                    <h6>GET HELP</h6>
                    <p>Order Status</p>
                    <p>Delivery</p>
                    <p>Returns</p>
                    <p>Payment Options</p>
                    <p>Contact Us</p>
                </div>
                <div class="col-12 col-md-4 col-lg-2 d-flex flex-column footer-about">
                    <h6>ABOUT NIKE</h6>
                    <p>News</p>
                    <p>Careers</p>
                    <p>Investors</p>
                    <p>Sustainability</p>
                </div>
                <div class="col-12 col-lg-6 d-flex flex-row footer-icon">
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