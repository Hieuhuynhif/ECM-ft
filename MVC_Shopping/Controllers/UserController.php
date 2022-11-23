<?php
class UserController extends BaseController
{
    private $userModel;
    private $olduri ;
    public function __construct()
    {
        $this->olduri = $_SESSION['olduri'];
        $this->loadModel('UserModel');
        $this->userModel = new UserModel();

    }
    public function index()
    {
        if(isset($_SESSION['user']))
        {
            return $this->view('frontend.users.index');
        }
        else
        {
            header("location: $this->olduri");
        }
    }
    public function usermanager()
    {
        if($_SESSION['user']['role'] == "admin")
        {
            return $this->view('frontend.users.usermanager');
        }
        else
        {
            return header("location: $this->olduri");
        }
    }
    public function getuser()
    {
        if(empty($_GET['username']) && empty($_GET['usernamesdt']))
        {
            return header("Location: $this->olduri");
        }
        else if(!empty($_GET['username']))
        {
            if($_SESSION['user']['username'] == $_GET['username'])
            {
                $user = $this->userModel->getby([
                    'username' => $_GET['username']
                ]);
                $json = json_encode($user);
                echo $json;
            }
        }
        else
        {
            if($_SESSION['user']['role'] == "admin")
            {
                $username = $this->userModel->getby([
                    'username' => $_GET['usernamesdt']
                ]);
                $sdt = $this->userModel->getby([
                    'sdt' => $_GET['usernamesdt']
                ]);
                if(empty($username) && empty($sdt))
                {
                    $json = [
                        "empty" => 1
                    ];
                }
                else if(!empty($username))
                {
                    $json = $username;
                }
                else
                {
                    $json = $sdt;
                }
                $json = json_encode($json);
                echo $json;
            }
            else{
                return header("Location: $this->olduri");
            }
        }
    }
    public function insertuser()
    {
        if($_SESSION['user']['role'] == "admin"  
            && isset($_POST['infoData']))
        {
            $infoData = json_decode($_POST['infoData'], true);
            $username = $this->userModel->getby([
                'username' => $infoData['username'],
            ]);
            $sdt = $this->userModel->getby([
                'sdt' => $infoData['sdt'],
            ]);
            if(empty($username) && empty($sdt))
            {
                if(isset($_FILES['avatar']))
                {
                    $src ='Assets/ImageUsers/' . $infoData['username'] . '.' . pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['avatar']['tmp_name'], $src);
                    $infoData['src'] = $src;
                }

                $this->userModel->insert($infoData);
                $json = [
                    "status" => "ok" 
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
            else
            {
                $json = [
                    "status" => "sdtexist" 
                ];
            }
        }
        else
        {
            $json = [
                "status" => "no" 
            ];
        }
        echo json_encode($json);
    }

    public function updateuser()
    {
        if(isset($_POST['infoData']))
        {
            $infoData = json_decode($_POST['infoData'], true);
            if(($_SESSION['user']['role'] == "admin" 
            || $infoData['username'] == $_SESSION['user']['username']))
            {
                if(isset($_FILES['avatar']))
                {
                    $src ='Assets/ImageUsers/' . $infoData['username'] . '.' . pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['avatar']['tmp_name'], $src);
                    $infoData['src'] = $src;
                }
                $this->userModel->update($infoData);
    
                $json = [
                    'status' => "ok"
                ];
            }
            else
            {
                $json = [
                    'status' => "no"
                ];
            }
        }
        else
        {
            $json = [
                'status' => "no"
            ];
        }
        echo json_encode($json);

    }
    
    public function deleteuser()
    {
        if(isset($_POST['infoData']))
        {
            $infoData = json_decode($_POST['infoData'], true);

            if($_SESSION['user']['role'] == "admin")
            {
                if($infoData['username'] != $_SESSION['user']['username'])
                {
                    $this->userModel->delete($infoData);
                    $json = [
                        'status' => "ok"
                    ];
                }
                else
                {
                    $json = [
                        'status' => "no"
                    ];
                }
            }
            else
            {
                if($infoData['username'] == $_SESSION['user']['username'])
                {
                    $this->userModel->delete($infoData);
                    unset($_SESSION['user']);
                    $json = [
                        'status' => "ok"
                    ];
                }
                else
                {
                    $json = [
                        'status' => "no"
                    ];
                }
                
            }
            
        }
        else
        {
            $json = [
                'status' => "no"
            ];
        }
        echo json_encode($json);
    }
}
?>