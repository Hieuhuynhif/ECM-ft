<?php
    class LikeController extends BaseController
    {
        private $userModel;
        public function __construct()
        {
            $this->loadModel('UserModel');
            $this->userModel = new UserModel();
        }
        public function index()
        {
            $_SESSION['olduri'] = $_SERVER['REQUEST_URI'];
            return $this->view('frontend.likes.index');
        }
        
        public function addlike()
        {
            if(!empty($_GET['id']))
            {
                $id = $_GET['id'];
                if(empty($_SESSION['like']) || !array_key_exists($id, $_SESSION['like']))
                {
                    $_SESSION['like'][$id] = true;
                    
                }
                else
                {
                    $_SESSION['like'][$id] = true;
                    
                }
            }
            $numlike = 0;
            if(!empty($_SESSION['like']))
            {
                $numlike = count($_SESSION['like']);
            }
            $json = [
                'likes' => $numlike
            ];
            echo json_encode($json);

        }
       
        public function dislike()
        {
            if(!empty($_GET['id']))
            {
                unset($_SESSION['like'][$_GET['id']]);
            }
        }
        public function getlike()
        {
            if(empty( $_SESSION['like']))
            {
                $likes = [
                    'empty' => TRUE
                ];
            }
            else{
                $this->loadModel('ProductModel');
                $productModel = new ProductModel;
                $likes = [];
                foreach($_SESSION['like'] as $key => $value){
                    $data = $productModel->getby([
                            'id' => $key
                    ]);
                    $data[0]['like'] = $value;
                    array_push($likes, $data[0]);
                }
            }
            $json = json_encode($likes);
            echo $json;
        }

    }
?>