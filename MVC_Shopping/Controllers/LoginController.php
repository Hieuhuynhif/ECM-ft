<?php
    class LoginController extends BaseController
    {
        private $userModel;
        public function __construct()
        {
            $this->loadModel('UserModel');
            $this->userModel = new UserModel();
        }
        public function index(){
            return $this->view('frontend.logins.index');
        }
        public function checklogin()
        {
            if(!empty($_SESSION['user']))
            {
                $json = $_SESSION['user'];
            }
            else{
                $json = [
                    "empty" => 1
                ];
            }
            $json = json_encode($json);
            echo $json;
           
        }
        public function register()
        {
            if(isset($_POST['formData']))
            {
                $form = json_decode($_POST['formData'], true);
                $username = $this->userModel->getby([
                    'username' => $form['username'],
                ]);
                $sdt = $this->userModel->getby([
                    'sdt' => $form['sdt'],
                ]);
                if(empty($username) && empty($sdt))
                {
                    $form['role'] = 'customer';
                    $this->userModel->insert($form);
                    $json = [
                        "status" => $_SESSION['olduri']
                    ];
                    $_SESSION['user'] = [
                        'username' => $form['username'],
                        'password' => $form['password'],
                        'role'     => 'customer'
                    ];
                }
                else if(!empty($username) && !empty($sdt))
                {
                    $json = [
                        "status" => "exist" 
                    ];
                }
                else if(!empty($username))
                {
                    $json = [
                        "status" => "usernameexist" 
                    ];
                }
                else{
                    $json = [
                        "status" => "sdtexist" 
                    ];
                }
                $json = json_encode($json);
                echo $json;
            }
        }
        public function login()
        {
            if(isset($_POST['formData']))
            {
                $form = json_decode($_POST['formData'], true);
                $username = $this->userModel->getby([
                    'username' => $form['username'],
                ]);
                $sdt = $this->userModel->getby([
                    'sdt' => $form['sdt'],
                ]);
                if(empty($username) && empty($sdt))
                {
                    $json = [
                        "status" => "notexist"
                    ];
                }
                else if(!empty($username))
                {
                    if($form['password'] == $username[0]['password'] )
                    {
                        $_SESSION['user'] = [
                            'username' => $username[0]['username'],
                            'password' => $username[0]['password'],
                            'role'     => $username[0]['role']
                        ];
                            $likes = $username[0]['likes'];
                            if(!empty($likes))
                            {
                                unset($_SESSION['like']);
                                $likes = explode(",",$likes);
                                foreach($likes as $like)
                                {
                                    $_SESSION['like'][$like] = TRUE;
                                }   
                            }

                        $json = [
                            "status" => $_SESSION['olduri']
                        ];
                    }
                    else 
                    {
                        $json = [
                            "status" => "incorrect"
                        ];
                    }
                }
                else
                {
                    if($form['password'] == $sdt[0]['password'] )
                    {
                        $_SESSION['user'] = [
                            'username' => $sdt[0]['username'],
                            'password' => $sdt[0]['password'],
                            'role'     => $sdt[0]['role']
                        ];
                        
                        $likes = $sdt[0]['likes'];
                        if(!empty($likes))
                        {
                            unset($_SESSION['like']);
                            $likes = explode(",",$likes);
                            foreach($likes as $like)
                            {
                                $_SESSION['like'][$like] = TRUE;
                            }   
                        }
                        $json = [
                            "status" => $_SESSION['olduri']
                        ];
                    }
                    else 
                    {
                        $json = [
                            "status" => "incorrect"
                        ];
                    }
                }
                $json = json_encode($json);
                echo $json;
            }
        }
        public function logout()
        {
            if(!empty($_SESSION['user']))
            {
                if(empty($_SESSION['like']))
                {
                    $likes = "";
                }
                else
                {
                    foreach($_SESSION['like'] as $key => $value)
                    {
                        if(!empty($value))
                        {
                            $likes[] = $key;
                        }
                    }
                    $likes = implode(",",$likes);
                }
                $username = $_SESSION['user']['username'];
                $infoData = [
                    'username'  => $username,
                    'likes'      => $likes     
                ];
                $this->userModel->update($infoData);
                unset($_SESSION['like']);
                unset($_SESSION['user']);
            }
        }
    }
?>