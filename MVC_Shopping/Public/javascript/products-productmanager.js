class ProductManager{
    constructor()
    {
        this.store();
        this.showheart();
        this.showcart();
        this.shownum();
        this.showlogin();
    }
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
            this.search();
            this.new();
        }
    }
    search()
    {
        document.getElementById("search")
        .addEventListener('click',async ()=>{
            let name = document.getElementById("nameSearch").value;
            if(name == "")
            {
                document.getElementById("main").innerHTML =
                `Name is empty`
            }
            else
            {
                let url =  `index.php?controller=product&action=getproduct&name=${name}`;
                let response = await fetch(url,{
                    method :"GET",
                })
                let data = await response.json();
                if(data.empty)
                {
                    document.getElementById("main").innerHTML =
                    `Name is not existed`;
                }
                else
                {
                    let src = `Assets/ImageDefault/ProductDefault.png`;
                    if(data[0].src)
                    {
                        src = data[0].src;
                    }
                    document.getElementById("main").innerHTML =
                    `
                    <div class="d-flex flex-row">
                        <div class="image">
                            <div class="image-frame">
                            <img src="${src}" alt="">
                            </div>
                        </div>
                        <div class="d-flex flex-column title">
                            <h5>Status :</h5>
                            <h5>ID :</h5>
                            <h5>Name :</h5>
                            <h5>Price :</h5>
                            <h5>Type :</h5>
                            <h5>Gender :</h5>
                            <h5>Detail :</h5>
                            <h5>Image :</h5> 
                        </div>
                        <div class="d-flex flex-column value">
                            <select name="" id="status">
                                <option value="1">Active</option>
                                <option value="0">Deactive</option>
                            </select>
                            <h5 id="id">${data[0].id}</h5>
                            <h5 id="name">${data[0].name}</h5>
                            <input type="text" id="price" placeholder = "price" value="${data[0].price}">
                            <select name="" id="type">
                                <option value="shoes">shoes</option>
                                <option value="hat">hat</option>
                                <option value="jacket">jacket</option>
                            </select>
                            <select name="" id="gender">
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="children">Children</option>
                            </select>
                            <input type="text" id="detail" placeholder = "detail" value="${data[0].detail}">
                            <input type="file" id="image">
                        </div>
                    </div>
                    <div class="notify">
                        <p class="text-break" id = "notify"></p>
                    </div>
                    <div class="d-flex flex-row edit-product" >
                        <button id="update">Update</button>
                        <button id="delete">Delete</button>
                    </div>`; 

                this.update();
                this.delete();
                }
            }
        })
    }
    update()
    {
        document.getElementById("update")
        .addEventListener('click',async ()=>{
            document.getElementById("notify").classList.remove("notify-text");   
            let name = document.getElementById("name").textContent;
            let status = document.getElementById("status").value;
            let price = document.getElementById("price").value;
            let type = document.getElementById("type").value;
            let gender = document.getElementById("gender").value;
            let detail = document.getElementById("detail").value;
            let image = document.getElementById("image").files[0];
            let notify = "";

            if(price =="")
            {
                notify =
                `Please fill all the infomation`;
            }
            else if(isNaN(price))
            {
                notify =
                `Price must be Number`;
            }
            else
            {
                let infoData = {
                    'name'  :   name,
                    'price' :   price,
                    'type'  :   type,
                    'gender':   gender,
                    'detail':   detail,
                    'status':   status
                }
                let formData = new FormData()
                if(image)
                {
                    formData.append('image', image)
                }
                formData.append('infoData', JSON.stringify(infoData));
                let url = "index.php?controller=product&action=updateproduct"
                let response = await fetch(url,{
                    method  :   "POST",
                    body:       formData,
                })
                let data = await response.json();
                if(data.status == "ok")
                {
                    notify =
                    `Update Successfully`;
                }
                else
                {
                    notify =
                    `Update Failed`;
                }
            }
            setTimeout(() => {
            document.getElementById("notify").innerHTML = notify;
            document.getElementById("notify").classList.toggle("notify-text");   
            }, 500);
        })

    }
    delete()
    {
        document.getElementById("delete")
        .addEventListener('click',async ()=>{
            document.getElementById("notify").classList.remove("notify-text");   
            let id = document.getElementById("id").textContent;
            let notify =""
            let infoData = {
                'id'  :   id,
            }
            let formData = new FormData();
            formData.append('infoData', JSON.stringify(infoData));
            let url = "index.php?controller=product&action=deleteproduct";
            let response = await fetch(url,{
                method  :   "POST",
                body    :   formData,
            })
            let data = await response.json();
            if(data.status == "ok")
            {
                notify = 
                `Delete Successfully`;
            }
            else
            {
                notify = 
                `Delete Failed`;
            }
            setTimeout(() => {
                document.getElementById("notify").innerHTML = notify;
                document.getElementById("notify").classList.toggle("notify-text");   
            }, 500);
        })

    }
    new()
    {
        document.getElementById("new")
        .addEventListener('click',()=>{
            document.getElementById("main").innerHTML =
                `<div class="d-flex flex-row">
                    <div class="d-flex flex-column title">
                        <h5>Status :</h5>
                        <h5>Name :</h5>
                        <h5>Type :</h5>
                        <h5>Gender :</h5>
                        <h5>Price:</h5>
                        <h5>Detail:</h5>
                        <h5>Image :</h5>
                    </div>
                    <div class="d-flex flex-column value">
                        <select name="" id="status">
                            <option value="1">Active</option>
                            <option value="0">Deactive</option>
                        </select>
                        <input type="text" id="name" placeholder="Name" value="">
                        <select name="" id="type">
                            <option value="shoes">Shoes</option>
                            <option value="hat">Hat</option>
                            <option value="jacket">Jacket</option>
                        </select>
                        <select name="" id="gender">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="children">Children</option>
                        </select>
                        <input type="text" id="price" placeholder="Price" value="">
                        <input type="text" id="detail" placeholder="Detail" value="">
                        <input type="file" id="image">
                    </div>
                </div>
                <div class="notify">
                <p class="text-break" id = "notify"></p>
                </div>
                <div class="d-flex flex-column edit-product" >
                    <button id="add">Add</button>
                </div>`;
                
            this.add();
        })
    }
    add()
    {
        document.getElementById("add")
        .addEventListener('click',async ()=>{
            document.getElementById("notify").classList.remove("notify-text");   
            let status = document.getElementById("status").value;
            let name = document.getElementById("name").value;
            let type = document.getElementById("type").value;
            let gender= document.getElementById("gender").value;
            let price= document.getElementById("price").value;
            let detail= document.getElementById("detail").value;
            let image = document.getElementById("image").files[0];
            let notify = "";
            if(name == "" || price == "" || detail == "" )
            {
                notify =
                `Please fill all the infomation`;
            }
            else if(isNaN(price))
            {
                notify =
                `The Price must be Number`;
            }
            else
            {
                let infoData = {
                    'name'      : name,
                    'type'      : type,
                    'gender'    : gender,
                    'price'     : price,
                    'detail'     : detail,
                    'status'    : status,
                }
                let formData = new FormData();
                if(image)
                {
                    formData.append('image', image);
                }
                formData.append('infoData', JSON.stringify(infoData));
                let url = "index.php?controller=product&action=insertproduct";
                let response = await fetch(url,{
                    method : "POST",
                    body : formData,
                });
                let data = await response.json()
                if(data.status == "ok")
                {
                    notify =
                    `Add Product Successfully`;
                }
                else if(data.status == "nameexist")
                {
                    notify =
                    `Name was existed`;
                }
                else
                {
                    notify =
                    `Error`;
                }

            }
            setTimeout(() => {
                document.getElementById("notify").innerHTML = notify;
                document.getElementById("notify").classList.toggle("notify-text");   
            }, 500);
        })
    }
}
const productManager = new ProductManager();