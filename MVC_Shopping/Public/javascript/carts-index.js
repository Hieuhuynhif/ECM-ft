class Cart
{
    constructor(){
        this.showbag();
        this.store();
        this.showheart();
        this.showcart();
        this.showlogin();
    }
    // 
    store()
    {
    document.getElementById("store").addEventListener("click",() =>{
        window.open(`index.php?`,"_self")
        });
    }
    //
    showcart()
    {
        document.getElementById('btnCart').addEventListener("click" , () => {
            return window.open("index.php?controller=cart", "_self");
        });
    }
    //
    async shownum()
    { 
        let urlCart = "index.php?controller=cart&action=addcart";
        let responseCart = await fetch(urlCart,{
            method: "GET"
        });
        let dataCart = await responseCart.json();
        document.getElementById("numCart").innerHTML = Object.values(dataCart);

        let urlLike = "index.php?controller=like&action=addlike";
        let responseLike = await fetch(urlLike,{
            method: "GET"
        });
        let dataLike = await responseLike.json();
        document.getElementById("numLike").innerHTML = Object.values(dataLike);
    }
    //
    showheart()
    {
        document.getElementById('btnHeart').addEventListener("click" , () => {
            window.open("index.php?controller=like", "_self");
        });
    }
    async showlogin()
    {
        let url = "index.php?controller=login&action=checklogin"
        let response = await fetch(url,{
            method: "GET"
        })
        let data = await response.json()
        if(data.empty)
        {
            this.loginRole = "";
            document.getElementById("editUser").innerHTML = 
            ``;
            document.getElementById("editProduct").innerHTML = 
            ``;
            document.getElementById("signIn").innerHTML = `Sign In`;
            document.getElementById("infoSignin").innerHTML = "";
            document.getElementById("signIn").addEventListener('click',()=>{
                window.open("index.php?controller=login","_self");
            })
        }
        else
        {
            this.loginRole = `${data.role}`;
            let checkLogin =`${data.username}|${data.password}|${data.role}`;
            document.getElementById("signIn").innerHTML = `Log Out`;
            document.getElementById("signIn")
            .addEventListener('click', ()=>{
                let url="index.php?controller=login&action=logout";
                fetch(url,{
                    method: "GET"
                })
                .then(()=>{
                    this.loginRole = "";
                    this.showlogin();
                });
            })
            document.getElementById("infoSignin").innerHTML = checkLogin;
            document.getElementById("infoSignin")
            .addEventListener('click',()=>{
                window.open("index.php?controller=user","_self");   
            })
            if(this.loginRole == "admin" || this.loginRole == "manager")
            {
                document.getElementById("editProduct").innerHTML = 
                `Product Manager |`;
                document.getElementById("editProduct")
                .addEventListener('click',()=>{
                    window.open("index.php?controller=product&action=productmanager","_self");
                })
            }
            if(this.loginRole == "admin")
            {
                document.getElementById("editUser").innerHTML = 
                `User Manager | `;
                document.getElementById("editUser")
                .addEventListener('click',()=>{
                    window.open("index.php?controller=user&action=usermanager","_self");
                })
            }
        }
    }
    // 
    async showbag()
    {
        let url = "index.php?controller=cart&action=getcart";
        let carts = "";
        let response = await fetch(url,{
            method: "GET"
        })
        let data = await response.json()
        if(data.empty){
            carts = "There are no items in your bag.";
        }
        else{
            data.forEach(productCard => {
                let src = `Assets/ImageProducts/ProductDefault.png`;
                if(productCard.src)
                {
                    src = productCard.src; 
                }
                let cards = ``;
                let subCards = "";
                cards = 
                `<div class="d-flex flex-column card-subcard" id ="${productCard.id}" >
                    <div class="d-flex flex-row card">
                        <div class="card-img">
                            <img src="${src}" alt="">
                        </div>
                        <div class="d-flex flex-column card-info">
                            <div class="card-delete">
                                <i class="fa-solid fa-xmark card-delete-btn"></i>
                            </div>
                            <div class="card-id">
                                <h6>ID: ${productCard.id}</h6>
                            </div>
                            <div class="card-price">
                                <h6>Price of Unit: ${productCard.price}</h6>
                            </div>
                            <div class="card-detail">
                                <h5>Detail:</h5>
                                <p class="text-break">${productCard.detail}</p>
                            </div>
                        </div>
                    </div> `;
                productCard.qty.forEach(qty =>{
                    subCards += 
                `<div class="d-flex flex-row sub-card-unit">
                    <div class="sub-card-color">${qty.color}</div>
                    <div class="sub-card-size">${qty.size}</div>
                    <div class="sub-card-qty">
                        <i class="fa-sharp fa-solid fa-minus sub-card-sub-btn"></i>
                        <span>${qty.qty}</span>
                        <i class="fa-sharp fa-solid fa-plus sub-card-add-btn"></i>
                    </div>
                    <div class="sub-card-total">${qty.qty * productCard.price}</div>
                    <div class="sub-card-delete"><i class="fa-solid fa-xmark sub-card-delete-btn"></i></div>
                </div>`;
                });
                carts += (cards +`<div class="d-flex flex-column sub-card">
                                    <div class="d-flex flex-row sub-card-title">
                                        <div class="sub-card-color">Color</div>
                                        <div class="sub-card-size">Size</div>
                                        <div class="sub-card-qty">Quantity</div>
                                        <div class="sub-card-total">Total</div>
                                        <div class="sub-card-delete"></div>
                                    </div>`
                        + subCards + `</div> 
                                        </div>`);
            });  
        }
        document.getElementById("detailBag").innerHTML = carts;
        this.shownum();
        this.showsummary();
        this.editcart();
    }
    // 
    editcart(){
        Array.from(document.getElementsByClassName("sub-card-delete-btn"))
        .forEach(element => {
            element.addEventListener("click", ()=>{
                let id = element.parentElement.parentElement.parentElement.parentElement.id;
                let color = element.parentElement.parentElement.children[0].textContent;
                let size = element.parentElement.parentElement.children[1].textContent;
                let url = `index.php?controller=cart&action=deletecart&id=${id}&color=${color}&size=${size}`;
                fetch(url,{
                    method : "GET"
                })
                .then(()=>{
                this.showbag();
                });
            })
        });
        Array.from(document.getElementsByClassName("card-delete-btn"))
        .forEach(element => {
            element.addEventListener("click", ()=>{
                let id = element.parentElement.parentElement.parentElement.parentElement.id;
                let url = `index.php?controller=cart&action=deletecart&id=${id}`;
                fetch(url,{
                    method : "GET"
                })
                .then(()=>{
                this.showbag();
                });
            })
        });
        Array.from(document.getElementsByClassName("sub-card-add-btn"))
        .forEach(element => {
            element.addEventListener("click", ()=>{
                let id = element.parentElement.parentElement.parentElement.parentElement.id;
                let color = element.parentElement.parentElement.children[0].textContent;
                let size = element.parentElement.parentElement.children[1].textContent;
                let qty = element.parentElement.children[1].textContent;
                let url = `index.php?controller=cart&action=addcart&id=${id}&color=${color}&size=${size}&qty=${qty}`;
                fetch(url,{
                    method : "GET"
                })
                .then(()=>{
                this.showbag();
                });
            })
        });
        Array.from(document.getElementsByClassName("sub-card-sub-btn"))
        .forEach(element => {
            element.addEventListener("click", ()=>{
                let id = element.parentElement.parentElement.parentElement.parentElement.id;
                let color = element.parentElement.parentElement.children[0].textContent;
                let size = element.parentElement.parentElement.children[1].textContent;
                let qty = element.parentElement.children[1].textContent;
                let url = `index.php?controller=cart&action=deletecart&id=${id}&color=${color}&size=${size}&qty=${qty}`;
                fetch(url,{
                    method : "GET"
                })
                .then(()=>{
                this.showbag();
                });
            })
        });

    }
    // 
    async showsummary()
    {
        let summary = "";
        let subtotal = "";
        let total = "";
        let checkout = "";
        let url = "index.php?controller=cart&action=getcart";
        let response = await fetch(url,{
            method : "GET"
        })
        let data = await response.json();
        if(data.empty)
        {
            summary = 
            `<div class="d-flex flex-column summary-subtotal">
                <div class="d-flex flex-row summary-subtotal-title">
                    <div class="summary-subtotal-title-name"><h6>Subtotal</h6></div>
                    <div class="summary-subtotal-title-price"><h6>0 vnd</h6></div>
                </div>
                <div class="d-flex flex-row summary-subtotal-title-empty"><h6>No items</h6></div>  
            </div>
            <div class="d-flex flex-row summary-total">
                <div class="summary-total-title"><h6>Total</h6></div>
                <div class="summary-total-price">0</div>
            </div>
            <div class="summary-checkout">
                <span class="summary-checkout-btn">Check Out</span>
            </div>`;
        }
        else
        {
            let totalPrice = 0;
            data.forEach(element => {
                let subTotalPrice = 0;
                element.qty.forEach(ele =>{
                    subTotalPrice += element.price * ele.qty;
                })
                totalPrice += subTotalPrice
                subtotal += 
                `<div class="d-flex flex-row summary-subtotal-unit">
                    <div class="summary-subtotal-unit-name">${element.name}</div>
                    <div class="summary-subtotal-unit-price">${subTotalPrice}</div>
                </div>`
            });

            subtotal = 
                `<div class="d-flex flex-column summary-subtotal">
                    <div class="d-flex flex-row summary-subtotal-title">
                        <div class="summary-subtotal-title-name"><h6>Subtotal</h6></div>
                        <div class="summary-subtotal-title-price"><h6>Price</h6></div>
                    </div>`
                    +
                    subtotal
                    +
                `</div>`;

            total = 
            `<div class="d-flex flex-row summary-total">
                <div class="summary-total-title"><h6>Total</h6></div>
                <div class="summary-total-price">${totalPrice}</div>
            </div>`;
            checkout =
            `<div class="summary-checkout">
                <span class="summary-checkout-btn summary-checkout-btn-active">Check Out</span>
            </div>`;
            summary = subtotal + total + checkout;
        }
        document.getElementById("detailSummary").innerHTML = summary;
    }
    
}


const showCart = new Cart();