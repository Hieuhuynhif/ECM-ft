<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Public/bootstrap-5.2.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="Public/fontawesome-free-6.2.0-web/css/all.min.css">
    <link rel="stylesheet" href="Public/style/users-index.css">
    <title>Your Account</title>
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

                        <div class="col-12 col-sm-10 col-lg-7 menu-option">
                            <span id="store">
                                <i class="fa-solid fa-angle-left"></i>
                                <i class="fa-solid fa-store"></i>
                                <span>STORE</span>
                            </span>
                        </div>

                        <div class="col-12 col-lg-3 menu-cart-heart">
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

            <div class="row account">
                <div class="col-12 col-md-7 d-flex flex-row account-general-info" >
                    <div class="d-flex flex-column account-general-info-title">
                        <h5>Username: </h5>
                        <h5>Role: </h5>
                        <h6>Password:</h6>
                        <h6>Confirm Password:</h6>
                        <h6>Phone Number:</h6>
                        <h6>Avatar:</h6>
                    </div>
                    <div class="d-flex flex-column account-general-info-value" id = "accountGeneralInfoValue">
                        
                    </div>
                </div>
                <div class="col-12 col-md-5 account-general-card" id="accountGeneralCard">
                    
                </div>

                <div class="col-12 notify">
                    <p class="text-break" id="notify"></p>
                </div>
                <div class="col-12 d-flex flex-row account-general-edit" id = "accountGeneralEdit">
                        
                </div>
                <div class="col-12 d-flex flex-column orders">
                    <div class="flex flex-column ">
                        <h3>Order History</h3>
                        <div class="order-title">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="d-flex flex-column" id="order">
                    
                    </div>
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

    <!-- Script----------- -->
<footer>
    <script src="Public/javascript/users-index.js"></script>
    <script src="Public/bootstrap-5.2.2/dist/js/bootstrap.min.js"></script>
</footer>
</body>
</html>