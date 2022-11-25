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
            let usernamesdt = document.getElementById("usernamesdt").value;
            if(usernamesdt == "")
            {
                document.getElementById("main").innerHTML =
                `Username or Phone Number is empty`
            }
            else
            {
                let url =  `index.php?controller=user&action=getuser&usernamesdt=${usernamesdt}`;
                let response = await fetch(url,{
                    method :"GET",
                })
                let data = await response.json();
                if(data.empty)
                {
                    document.getElementById("main").innerHTML =
                    `Username or Phone Number is not exist`;
                }
                else
                {
                    let src = `Assets/ImageUsers/UserDefault.png`;
                    if(data[0].src)
                    {
                        src = data[0].src;
                    }
                    document.getElementById("main").innerHTML =
                    `
                    <div class="d-flex flex-row">
                        <div class="image">
                            <div class="image-frame">
                                <img  src="${src}" alt="">
                            </div>
                        </div>
                        <div class="d-flex flex-column title">
                            <h5>Username :</h5>
                            <h5>Role :</h5>
                            <h5>Phone Number :</h5>
                            <h5>Password :</h5>
                            <h5>Confirm Password :</h5>
                            <h5>Avatar :</h5> 
                        </div>
                        <div class="d-flex flex-column value">
                            <h5 id="username">${data[0].username}</h5>
                            <h5 id="role">${data[0].role}</h5>
                            <input type="text" id="sdt" placeholder = "" value="${data[0].sdt}">
                            <input type="password" id="password" placeholder = "Password" value="${data[0].password}">
                            <input type="password" id="confirmPassword" placeholder = "Confirm Password" value="${data[0].password}">
                            <input type="file" id="avatar">
                        </div>
                    </div>
                    <div class="notify">
                        <p class="text-break" id = "notify"></p>
                    </div>
                    <div class="d-flex flex-row edit-user" >
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
            let username = document.getElementById("username").textContent;
            let sdt = document.getElementById("sdt").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let avatar = document.getElementById("avatar").files[0];
            let notify = "";

            if(sdt == "" || password =="" || confirmPassword =="" )
            {
                notify =
                `Please fill all the infomation`;
            }
            else if(isNaN(sdt))
            {
                notify =  
                `Phone Number must be Number`;
            }
            else if(password != confirmPassword)
            {
                notify = 
                `Password and Confirm Password are not the same`;
            }
            else
            {
                let infoData = {
                    'username'  :   username,
                    'password'  :   password,
                    'sdt'       :   sdt,
                }
                let formData = new FormData()
                if(avatar)
                {
                    formData.append('avatar', avatar);
                }
                formData.append('infoData', JSON.stringify(infoData));
                let url = "index.php?controller=user&action=updateuser"
                let response = await fetch(url,{
                    method  :   "POST",
                    body: formData,
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
            let username = document.getElementById("username").textContent;
            let notify = "";
            let infoData = {
                'username'  :   username,
            }
            let formData = new FormData();
            formData.append('infoData', JSON.stringify(infoData));
            let url = "index.php?controller=user&action=deleteuser";
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
                `
                <div class = "d-flex flex-row">
                    <div class="d-flex flex-column title">
                        <h5>Username :</h5>
                        <h5>Role :</h5>
                        <h5>Phone Number :</h5>
                        <h5>Password :</h5>
                        <h5>Confirm Password :</h5>
                        <h5>Avatar :</h5>
                        
                    </div>
                    <div class="d-flex flex-column value">
                        <input type="text" id="username" placeholder="Username" value="">
                        <select name="" id="role">
                            <option value="customer">Customer</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        <input type="text" id="sdt" placeholder="Phone Number" value="">
                        <input type="password" id="password" placeholder="Password" value="">
                        <input type="password" id="confirmPassword" placeholder="Confirm Password" value="">
                        <input type="file" id="avatar">
                    </div>
                    <div class = "card-frame">
                        <div class="card">
                            <div class="d-flex card-img">
                            <img  src="Assets/ImageDefault/UserDefault.png" alt="">
                            </div>
                            <div class="card-action">
                                <div class="d-flex flex-column card-info">
                                    <p>Username</p>
                                    <p>Role</p>
                                </div>
                                <div class="d-flex flex-row card-icon">
                                    <i class="fa-brands fa-facebook"></i>
                                    <i class="fa-brands fa-instagram"></i>
                                    <i class="fa-brands fa-tiktok"></i>
                                    <i class="fa-solid fa-envelopes-bulk"></i>
                                </div>
                                <div class="d-flex card-contact">
                                    <button>Contact</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notify">
                    <p class="text-break" id = "notify"></p>
                </div>
                <div class="d-flex flex-column edit-user" >
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
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let username = document.getElementById("username").value;
            let role = document.getElementById("role").value;
            let sdt = document.getElementById("sdt").value;
            let avatar = document.getElementById("avatar").files[0];
            let notify = "";
            if(password =="" || confirmPassword =="" 
            || username =="" || role ==""
            || sdt =="" )
            {
                notify =
                `Please fill all the infomation`;
            }
            else if(isNaN(sdt))
            {
                notify =
                `Phone Number must be Number`;
            }
            else if(password != confirmPassword)
            {
                notify =
                `Password and Confirm Password are not the same`;
            }
            else
            {
                let infoData = {
                    'username': username,
                    'password': password,
                    'role'    : role,
                    'sdt'     : sdt
                }
                let formData = new FormData();
                if(avatar)
                {
                    formData.append('avatar', avatar);
                }
                formData.append('infoData', JSON.stringify(infoData));
                let url = "index.php?controller=user&action=insertuser";
                let response = await fetch(url,{
                    method : "POST",
                    body : formData,
                });
                let data = await response.json()
                if(data.status == "ok")
                {
                    notify =
                    `Register Successfully`;
                }
                else if(data.status == "exist")
                {
                    notify =
                    `Username and Phone Number existed`;
                }
                else if(data.status == "usernameexist")
                {
                    notify =
                    `Username existed`;
                }
                else if(data.status =="sdtexist")
                {
                    notify =
                    `Phone Number existed`;
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