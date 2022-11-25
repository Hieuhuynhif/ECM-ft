class User{
    constructor()
    {
        this.store();
        this.showheart();
        this.showcart();
        this.shownum();
        this.showlogin();
        this.show();
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
        }
    }
    async show()
    {
        let urlCheck = "index.php?controller=login&action=checklogin";
        let responseCheck = await fetch(urlCheck,{
            method: "GET"
        })
        let dataCheck = await responseCheck.json()
        if(dataCheck.empty)
        {
            window.open("index.php?controller=login","_self");
        }
        else 
        {
            let url = `index.php?&controller=user&action=getuser&username=${dataCheck.username}`;
            let response = await fetch(url,{
                method: "GET"
            })
            let data = await response.json()
            document.getElementById("accountGeneralInfoValue").innerHTML = 
            `<h5 id = "username">${data[0].username}</h5>
            <h5 id = "role">${data[0].role}</h5>
            <input type="password" value="${data[0].password}" placeholder = "Password" id = "password">
            <input type="password" value="${data[0].password}" placeholder = "Confirm Password" id = "confirmPassword">
            <input type="text" value="${data[0].sdt}" placeholder = "Phone Number" id="sdt">
            <input type="file" name="" id="avatar">`;
            document.getElementById("accountGeneralEdit").innerHTML =
            `<button id = "update">Update Infomation</button>
            <button id = "delete">Delete Account</button>`;

            let src = `Assets/ImageUsers/UserDefault.png`;
            if(data[0].src)
            {
                src = data[0].src;
            }
            document.getElementById("accountGeneralCard").innerHTML =
                `<div class="card">
                <div class="d-flex card-img">
                    <img src="${src}" alt="">
                </div>
                <div class="card-action">
                    <div class="d-flex flex-column card-info">
                        <p>${data[0].username}</p>
                        <p>${data[0].role}</p>
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
                </div>`;

                this.update();
                this.delete();
        } 
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
                    formData.append('avatar', avatar)
                }
                formData.append('infoData', JSON.stringify(infoData));
                let url = "index.php?controller=user&action=updateuser";
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
                `Delete Successfully
                <br>The Page will be back in 5s`;
                setTimeout(() => {
                    location.reload();
                    }, 5000);
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
}
const userIndex = new User();