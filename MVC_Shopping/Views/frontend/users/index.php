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
        <div class="d-flex flex-column">
<!-- Header--------------------------------------------------------- -->
            <div class="d-flex flex-column header">
                <div class="d-flex flex-row jordan">
                    <div class="icon-jordan">
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
                        <span id="store">
                        <i class="fa-solid fa-angle-left"></i>
                        <i class="fa-solid fa-store"></i>
                        <span>STORE</span>
                        </span>
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
            <div class="d-flex flex-column account">
                <div class="d-flex flex-row account-general">
                    <div class="d-flex flex-row account-general-info" >
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
                    <div class="account-general-card" id="accountGeneralCard">
                        
                    </div>
                </div>
                <div class="notify">
                    <p class="text-break" id="notify"></p>
                </div>
                <div class="d-flex flex-row account-general-edit" id = "accountGeneralEdit">
                        
                </div>
                <div class="d-flex flex-column orders">
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

    <!-- Script----------- -->
<footer>
    <script src="Public/javascript/users-index.js"></script>
    <script src="Public/bootstrap-5.2.2/dist/js/bootstrap.min.js"></script>
</footer>
</body>
</html>