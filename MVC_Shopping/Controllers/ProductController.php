<?php
    class ProductController extends BaseController
    {
        private $productModel;
        public function __construct()
        {
            $this->loadModel('ProductModel');
            $this->productModel = new ProductModel();
        }
        public function index()
        {
            $_SESSION['olduri'] = $_SERVER['REQUEST_URI'];
            return $this->view('frontend.products.index');
        }
        public function getproduct()
        {
            if(isset($_GET['id']))
            {
                $id = $_GET['id'];
                $products = $this->productModel->getby([
                    'id' => $id,
                    'status' => 1,
                ]);
            }
            else if(isset($_GET['name']))
            {
                $name = $_GET['name'];
                $products = $this->productModel->getby([
                    'name' => $name,
                ]);
                if(empty($products))
                {
                    $products = [
                        "empty" =>  "1",
                    ];
                }
            }
            else if(isset($_GET['type']) && isset($_GET['gender']))
            {
                $type = $_GET['type'];
                $gender = $_GET['gender'];
                $products = $this->productModel->getby([
                    'type' => $type,
                    'gender' => $gender,
                    'status' => 1,
                ]);
        
            }
            else if(isset($_GET['type']))
            {
                $type = $_GET['type'];
                $products = $this->productModel->getby([
                    'type' => $type,
                    'status' => 1,

                ]);
            }
            else if(isset($_GET['gender']))
            {
                $gender = $_GET['gender'];
                $products = $this->productModel->getby([
                    'gender' => $gender,
                    'status' => 1,
                ]);
            }
            else 
            {
                $products = $this->productModel->getall();
            }

            echo json_encode($products);
        }
        public function searchproduct()
        {
            if(isset($_GET['name']))
            {
                $name = $_GET['name'];
                $products = $this->productModel->getlike([
                    'name' => $name,
                    'status' => 1,
                ]);
                if(empty($products))
                {
                    $products = [
                        "empty" =>  "1",
                    ];
                }
            }
            else
            {
                $products = [
                    "empty" =>  "1",
                ];
            }
            echo json_encode($products);
        }
        public function productmanager()
        {
            if($_SESSION['user']['role'] == "manager" || $_SESSION['user']['role'] == "admin")
            {
                return $this->view('frontend.products.productmanager');
            }
            else{
                $olduri = $_SESSION['olduri'];
                return header("Location: ${olduri}");
            }
        }

        public function insertproduct()
        {
            if(($_SESSION['user']['role'] == "admin" || $_SESSION['user']['role'] == "manager")
                    && isset($_POST['infoData']))
            {
                $infoData = json_decode($_POST['infoData'], true);
                $name = $this->productModel->getby([
                    'name' => $infoData['name'],
                ]);
                if(empty($name))
                {
                    if(isset($_FILES['image']))
                    {
                        $src ='Assets/ImageProducts/' . $infoData['name'] . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                        move_uploaded_file($_FILES['image']['tmp_name'], $src);
                        $infoData['src'] = $src;
                    }

                    $this->productModel->insert($infoData);
                    $json = [
                        "status" => "ok" 
                    ];
                }
                else
                {
                    $json = [
                        "status" => "nameexist" 
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

        public function updateproduct()
        {
            if(($_SESSION['user']['role'] == "admin" || $_SESSION['user']['role'] == "manager")
                && isset($_POST['infoData']))
            {
                $infoData = json_decode($_POST['infoData'], true);
                if(isset($_FILES['image']))
                {
                    $src ='Assets/ImageProducts/' . $infoData['name'] . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['image']['tmp_name'], $src);
                    $infoData['src'] = $src;
                }
                $this->productModel->update($infoData);
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
        echo json_encode($json);
        }

        public function deleteproduct()
        {
            if(($_SESSION['user']['role'] =="manager" || $_SESSION['user']['role'] =="admin")
                    &&isset($_POST['infoData']))
            {
                $infoData = json_decode($_POST['infoData'], true);
                $this->productModel->delete($infoData);
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
            echo json_encode($json);
        }



    }

?>