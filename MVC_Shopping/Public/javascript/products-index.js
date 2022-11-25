
class ProductIndex
{
    color = "";
    size = "";
    loginRole = "";
    constructor()
    {
        this.showlogin();
        this.search()
        this.showcart();
        this.showheart();
        this.showby();
        this.shownum();
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
            let checkLogin =`${data.username}|${data.sdt}|${data.role}`;
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
                    this.shownum();
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
        this.show();
    }
    showby()
    {
        Array.from(document.getElementsByClassName("select"))
        .forEach(element => {
            let id = element.id;
            element.addEventListener("click", async () =>{
                let url = "index.php?controller=product&action=getproduct&" + id ;
                let response = await fetch(url,{
                    method: "GET"
                });
                let data = await response.json();
                this.show(data);
            });
        });
    }
    search()
    {
        document.getElementById("search")
        .addEventListener('keypress', async (event)=>{
            if(event.key === "Enter")
            {
                let search = document.getElementById("search").value;
                    search = `name=${search}`;
                    let url = "index.php?controller=product&action=searchproduct&" + search ;
                    let response = await fetch(url,{
                        method: "GET"
                    });
                    let data = await response.json();
                    this.show(data);
            }
        })
    }
    async show(data ="")
    {
        if(data == "")
        {
            let url = "index.php?controller=product&action=getproduct" ;
                let response = await fetch(url,{
                    method: "GET"
                });
                data = await response.json();
        }
        let products ="";
        if(data.empty)
        {
            products = "Product was not Existed"
        }
        else
        {
            let editProduct ="";
        if(this.loginRole == "admin" || this.loginRole =="manager")
        {
            editProduct = `<span class="edit edit-product"><i class="fa-solid fa-pen-to-square"></i></span>`;
        }
        data.forEach(productCard => {
            let src = `Assets/ImageProducts/ProductDefault.png`;
            if(productCard.src)
            {
                src = productCard.src; 
            }
            products += 
                `<div class="card_c col" id ="${productCard.id}">
                <span class="like addToFvr"><i class="fa-sharp fa-solid fa-heart-circle-plus"></i></span>
                <span class="cart addToCart"><i class="fa-solid fa-cart-plus" ></i></span>`
                + editProduct +
                `<div class="card-img">
                    <div class="card__img">
                    <img src="${src}" alt="" />
                    </div>
                </div>
                <h2 class="card__title">${productCard.name}</h2>
                <p class="card__price">${productCard.price}</p>
                <div class="card__action">
                    <div class="card-color-size">
                        <div class="card__size">
                            <h5>Size:</h5>
                            <span class="size">6</span>
                            <span class="size">7</span>
                            <span class="size">8</span>
                            <span class="size">9</span>
                        </div>
                        <div class="card__color">
                            <h5>Color:</h5>
                            <span class="color green"></span>
                            <span class="color red"></span>
                            <span class="color black"></span>
                        </div>
                    </div>
                    <div class="card-detail-buy">
                        <button class ="card-detail">Detail</button>
                        <button class ="card-buy">Buy now</button>
                    </div>
                </div>
                </div>`;
        }) 
        }
        
        document.getElementById("products").innerHTML = products;
        this.addcart();
        this.addlike();
        this.showdetail();
        this.choseSizeColor();
        this.showproductmanager();
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
    choseSizeColor()
    {   
        Array.from(document.getElementsByClassName("card_c"))
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
    showdetail()
    {
        Array.from(document.getElementsByClassName("card-detail"))
        .forEach((element) => {
            element.addEventListener("click",async () => {
                let url = "index.php?controller=product&action=getproduct&id=" + element.parentElement.parentElement.parentElement.id;
                let response = await fetch(url,{
                    method: "GET"
                })
                let data = await response.json()
                document.getElementById("detailProduct").innerHTML = data[0].detail;
            });
        });
    }
    addcart()
    {
        Array.from(document.getElementsByClassName("addToCart"))
        .forEach((element) => {
            element.addEventListener("click" , async () => {
                let url = `index.php?controller=cart&action=addcart&color=${this.color}&size=${this.size}&id=` + element.parentElement.id;
                let response = await fetch(url,{
                    method : "GET"
                })
                let data = await response.json();
                document.getElementById("numCart").innerHTML = Object.values(data);
            });  
        });
    }

    addlike()
    {
        Array.from(document.getElementsByClassName("addToFvr"))
        .forEach((element) => {
            element.addEventListener("click" ,async () => {
                let url = `index.php?controller=like&action=addlike&color=${this.color}&size=${this.size}&id=` + element.parentElement.id;
                let response = await fetch(url,{
                    method : "GET"
                })
                let data = await response.json();
                document.getElementById("numLike").innerHTML = Object.values(data);
                
            });  
        });
    }
    showproductmanager()
    {
        Array.from(document.getElementsByClassName("edit-product"))
        .forEach(element =>{
            element.addEventListener('click', ()=>{
                let url = `index.php?controller=product&action=productmanager&id=` + element.parentElement.id;
                window.open(url);
            })
        })
    }

    
}
//////
var productIndex = new ProductIndex();


