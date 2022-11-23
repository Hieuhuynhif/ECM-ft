class Like
{
    color ="";
    size = "";
    constructor()
    {
        this.store();
        this.showheart();
        this.showcart();
        this.showlike();
        this.showlogin()
    }
    store()
    {
    document.getElementById("store").addEventListener("click",() =>{
        window.open(`index.php?`,"_self")
        });
    }
    showcart()
    {
        document.getElementById('btnCart').addEventListener("click" , () => {
            return window.open("index.php?controller=cart", "_self");
        });
    }
    showheart()
    {
        document.getElementById('btnHeart').addEventListener("click" , () => {
            window.open("index.php?controller=like", "_self");
        });
    }
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
                    location.reload();
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
                `User Manager |`;
                document.getElementById("editUser")
                .addEventListener('click',()=>{
                    window.open("index.php?controller=user&action=usermanager","_self");
                })
            }
        }
    }
    async showlike()
    {
        let likes="";
        let url = "index.php?controller=like&action=getlike";
        let response = await fetch(url,{
            method : "GET"
        })
        let data = await response.json();
        if(data.empty)
        {
            likes = "Item added to you your Favourites will be saved here";
        }
        else
        {
            data.forEach(productCard => {
                let src = `Assets/ImageProducts/ProductDefault.png`;
                if(productCard.src)
                {
                    src = productCard.src; 
                }
                likes += 
                `<div class="d-flex flex-row card" id ="${productCard.id}">
                    <div class="card-img">
                        <img src="${src}" alt="">
                    </div>
                    <div class="d-flex flex-row card-info">
                        <div class = "d-flex flex-column card-if"> 
                            <div class="card-id">
                                <h6>ID: ${productCard.id}</h6>
                            </div>
                            <div class="card-price">
                                <h6>Price of Unit: ${productCard.price}</h6>
                            </div>
                            <div class="card-name">
                                <h6>Name: ${productCard.name}</h6>
                            </div>
                            <div class="d-flex flex-column card-option">
                                <div class="card-option-color">
                                    <span class="color green"></span>
                                    <span class="color red"></span>
                                    <span class="color black"></span>
                                </div>
                                <div class="card-option-size">
                                    <span class="size">6</span>
                                    <span class="size">7</span>
                                    <span class="size">8</span>
                                    <span class="size">9</span>
                                </div>
                            </div> 
                        </div>
                        
                        <div class="d-flex flex-column card-icon">
                            <i class="fa-solid fa-cart-plus card-icon-addtocart"></i>
                            <i class="fa-solid fa-eye card-icon-showdetail"></i>
                            <i class="fa-solid fa-thumbs-down card-icon-dislike"></i>
                        </div>
                    </div>
                </div>`;
            })
        }
        document.getElementById("likeProduct").innerHTML = likes;
        this.shownum();
        this.dislike();
        this.showdetail();
        this.addcart();
        this.choseSizeColor();
    }
    dislike()
    {
        Array.from(document.getElementsByClassName("card-icon-dislike"))
        .forEach(element =>{
            element.addEventListener("click",()=>{
                let id = element.parentElement.parentElement.parentElement.id;
                let url = `index.php?controller=like&action=dislike&id=${id}`;
                fetch(url,{
                    method : "GET"
                })
                .then(()=>{
                    this.showlike();
                })
            });
        })
    }
    showdetail()
    {
        Array.from(document.getElementsByClassName("card-icon-showdetail"))
        .forEach(element => {
            element.addEventListener("click",async ()=>{
                let id = element.parentElement.parentElement.parentElement.id;
                let url = `index.php?controller=product&action=getproduct&id=${id}`;
                let response = await fetch(url,{
                    method: "GET"
                })
                let data = await response.json();
                document.getElementById("detailProduct").innerHTML = data[0].detail;
            })
        });
    }
    choseSizeColor()
    {   
        Array.from(document.getElementsByClassName("card"))
        .forEach(element =>{
            element.addEventListener("mouseleave", ()=>{
                this.color ="";
                this.size ="";
                if(document.getElementsByClassName("toggle-click-size")[0])
                {
                    document.getElementsByClassName("toggle-click-size")[0]
                    .classList.remove("toggle-click-size");
                }
                if(document.getElementsByClassName("toggle-click-color")[0])
                {
                    document.getElementsByClassName("toggle-click-color")[0]
                    .classList.remove("toggle-click-color");
                }
            });
        })

        Array.from(document.getElementsByClassName("size"))
        .forEach(element =>{
            element.addEventListener('click', ()=>{
                if(element.className == "size toggle-click-size")
                {
                    element.classList.toggle("toggle-click-size");
                    this.size ="";
                }else{
                    Array.from(element.parentElement.children)
                    .forEach(elm =>{
                        elm.classList.remove("toggle-click-size");
                    })
                    element.classList.toggle("toggle-click-size");
                    this.size = element.textContent;
                }
            })
        })
        Array.from(document.getElementsByClassName("color"))
        .forEach(element =>{
            element.addEventListener('click', ()=>{
                if(element.className.split(' ')[2] == "toggle-click-color")
                {
                    element.classList.toggle("toggle-click-color");
                    this.color ="";
                }else{
                    Array.from(element.parentElement.children)
                    .forEach(elm =>{
                        elm.classList.remove("toggle-click-color");
                    })
                    element.classList.toggle("toggle-click-color");
                    this.color = element.className.split(' ')[1];
                }
            })
        })
    }
    addcart()
    {
        Array.from(document.getElementsByClassName("card-icon-addtocart"))
        .forEach((element) => {
            element.addEventListener("click" , async () => {
                let url = `index.php?controller=cart&action=addcart&color=${this.color}&size=${this.size}&id=` + element.parentElement.parentElement.parentElement.id;
                let response = await fetch(url,{
                    method : "GET"
                })
                let data = await response.json();
                document.getElementById("numCart").innerHTML = Object.values(data);
            });  
        });
    }
    
}
const likeIndex = new Like();