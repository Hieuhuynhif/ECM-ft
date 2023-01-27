class Login
{
    constructor()
    {
        this.showregister();
        this.login();
        this.store();
        this.showcart()
        this.showheart();
        this.shownum();
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
    login()
    {
        document.getElementById("login")
        .addEventListener('click',async ()=>{
            let usernamesdt = document.getElementById("usernamesdt").value;
            let password = document.getElementById("password").value;
            if(usernamesdt == "" || password == "")
            {
                document.getElementById("loginNotify").innerHTML=
                `Username or Password is empty`;
            }
            else
            {
                let url = "index.php?controller=login&action=login";
                let loginform = {
                    'username' : usernamesdt,
                    'password' : password,
                    'sdt'      : usernamesdt
                }
                let formData = new FormData()
                formData.append('formData',JSON.stringify(loginform))
                let response = await fetch(url,{
                    method : "POST",
                    body : formData,
                })
                
                let data = await response.json();
                if(data.status == "notexist")
                {
                    document.getElementById("loginNotify").innerHTML=
                    `Username  is not existed`;
                }
                else if( data.status == "incorrect")
                {
                    document.getElementById("loginNotify").innerHTML=
                    `Password is incorrect`;
                }
                else{
                    window.open(`${data.status}`,"_self");
                }
            }

        })
    }
    showregister()
    {
        let formRegister = 
        `
            <input type="text" value="" placeholder="Username" id = "username">
            <input type="text" value="" placeholder="Phone Number" id = "sdt">
            <input type="password" name="" id="password" value="" placeholder="Password">
            <input type="password" name="" id="confirmPassword" placeholder="Confirm Password">
            <button id = "register">Register</button>
            <div class="notify text-break">
                <p id = "registerNotify"></p>
            </div>   
        `
        document.getElementById("showRegister")
        .addEventListener('click', ()=>{
        document.getElementById("loginForm").innerHTML = formRegister;
        this.register();
        })
    }
    register()
    {
        document.getElementById("register")
        .addEventListener('click', async ()=>{
            let username = document.getElementById("username").value;
            let sdt = document.getElementById("sdt").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            
            if(username == "" || sdt == "" || password == "" || confirmPassword == "")
                {
                    document.getElementById("registerNotify").innerHTML=
                    `Username or Password or Phone Number is empty`;
                }
            else if(password != confirmPassword)
                {
                    document.getElementById("registerNotify").innerHTML=
                    `Password is not the same`;
                }
            else if(isNaN(sdt))
            {
                document.getElementById("registerNotify").innerHTML=
                    `Phone Number is not a number`;
            }
            else
            {  
                let registerForm = {
                    "username" : username,
                    "password" : password,
                    "sdt"      : sdt,
                }
                let formData = new FormData()
                formData.append('formData',JSON.stringify(registerForm))
                let url = "index.php?controller=login&action=register";
                let response = await fetch(url, {
                    method : "POST",
                    body : formData,
                })
                let data = await response.json();
                if(data.status == "exist")
                {
                    document.getElementById("registerNotify").innerHTML=
                    `Username and Phone Number were existed`;
                }
                else if(data.status == "usernameexist")
                {
                    document.getElementById("registerNotify").innerHTML=
                    `Username  was existed`;
                }
                else if(data.status == "sdtexist")
                {
                    document.getElementById("registerNotify").innerHTML=
                    `Phone Number was existed`;
                }
                else{
                    window.open(`${data.status}`,"_self");
                }
            }
        })
    }
}
const loginIndex = new Login();