 <?php
    class CartController extends BaseController
    {
        private $orderModel;
        private $orderDetailModel;
        public function __construct()
        {
            $this->loadModel('OrderModel');
            $this->loadModel('OrderDetailModel');
            $this->orderModel = new OrderModel();
            $this->orderDetailModel = new OrderDetailModel();
        }
        public function index()
        {
            $_SESSION['olduri'] = $_SERVER['REQUEST_URI'];
            return $this->view('frontend.carts.index');
        }
        public function addcart()
        {
            if(!empty($_GET['id']) && !empty($_GET['color']) && !empty($_GET['size']))
            {
                $id = $_GET['id'];
                $color = $_GET['color'];
                $size = $_GET['size'];
                if(empty($_SESSION['cart']) || !array_key_exists($id, $_SESSION['cart']))
                {
                    $_SESSION['cart'][$id][] = [
                        'color' => $color,
                        'size' => $size,
                        'qty'   => 1
                    ];
                }
                else{
                    foreach($_SESSION['cart'][$id] as $key => $value)
                    {
                        if($value['color'] == $color&& $value['size'] == $size){
                            $_SESSION['cart'][$id][$key]['qty'] ++;
                            goto jump;
                        }
                    }
                    $_SESSION['cart'][$id][] = [
                        'color' => $color,
                        'size' => $size,
                        'qty'   => 1
                    ];
                }
            }
            jump: 
            $numCart = 0;
            if(!empty($_SESSION['cart']))
            {
                foreach($_SESSION['cart'] as $items)
                {
                    foreach($items as $qty)
                    {
                    $numCart += $qty['qty'];
                    }
                }
            }
            $json = json_encode([
            'carts' => $numCart
            ]);
            echo $json;
        }

        public function deletecart()
        {
            if(!empty($_GET['id']) && !empty($_GET['color']) && !empty($_GET['size']) && !empty($_GET['qty']))
            {
                foreach ($_SESSION['cart'][$_GET['id']] as $key => $value) 
                {
                    if($value['color'] == $_GET['color'] && $value['size'] == $_GET['size'] && $value['qty'] > 0)
                    {
                        
                        $_SESSION['cart'][$_GET['id']][$key]['qty'] --;
                        if($_SESSION['cart'][$_GET['id']][$key]['qty'] == 0)
                        {
                            unset($_SESSION['cart'][$_GET['id']][$key]);
                            array_splice($_SESSION['cart'][$_GET['id']],$key,($key - count($_SESSION['cart'][$_GET['id']])));
                        }
                        if(count($_SESSION['cart'][$_GET['id']]) == 0)
                        {
                            unset($_SESSION['cart'][$_GET['id']]);
                        }
                    }
                }
            }
            else if(!empty($_GET['id']) && !empty($_GET['color']) && !empty($_GET['size']))
            {
                foreach ($_SESSION['cart'][$_GET['id']] as $key => $value) 
                {
                    if($value['color'] == $_GET['color'] && $value['size'] == $_GET['size'])
                    {
                       unset($_SESSION['cart'][$_GET['id']][$key]);
                        array_splice($_SESSION['cart'][$_GET['id']],$key,($key - count($_SESSION['cart'][$_GET['id']])));

                    }
                    if(count($_SESSION['cart'][$_GET['id']]) == 0)
                    {
                        unset($_SESSION['cart'][$_GET['id']]);
                    }
                }
            }
            else if(!empty($_GET['id']))
            {
                unset($_SESSION['cart'][$_GET['id']]);
                if(count($_SESSION['cart']) == 0)
                {
                    unset($_SESSION['cart']);
                }
            }
            else
            {
                unset($_SESSION['cart']);
            }
        }
        
        public function getcart()
        {
            if(empty( $_SESSION['cart']))
            {
                $carts = [
                    "empty" => TRUE
                ];
            }
            else{
                $this->loadModel('ProductModel');
                $productModel = new ProductModel;
                $carts = [];
                foreach($_SESSION['cart'] as $key => $value){
                    $data = $productModel->getby([
                            'id' => $key
                    ]);
                    $data[0]['qty'] = $value;
                    $carts[] = $data[0];
                }
            }
            $json = json_encode($carts);
            echo $json;
        }
        public function order()
        {
            if(!empty($_SESSION['cart']) && !empty($_SESSION['user'])
                && !empty($_POST['order']))
            {
                $order = json_decode($_POST['order'], true);
                $order['username']  =   $_SESSION['user']['username'];
                $this->orderModel->insert($order);
                $time = [
                    'time' => $order['time']
                ];
                $order = $this->orderModel->getby($time);
                foreach($_SESSION['cart'] as $id_product => $qty)
                {
                    foreach($qty as $value)
                    {
                        $detailOrder = [
                            'id_order'      => $order[0]['id'],
                            'id_product'    => $id_product,
                            'color'         => $value['color'],
                            'size'          => $value['size'],
                            'qty'           => $value['qty']
                        ];
                        $this->orderDetailModel->insert($detailOrder);
                    }   
                }
                $json = [
                    'status' => 'ok'
                ];
            }
            else
            {
                $json = [
                    'status' => 'no'
                ];
            }

            echo json_encode($json);
        }
        public function getorder()
        {
            if(!empty($_SESSION['user']))
            {
                $orders = $this->orderModel->getby([
                    'username'  =>  $_SESSION['user']['username']
                ]);

                if(empty($orders))
                {
                    $json = [
                        'empty' =>  true
                    ];
                }
                else
                {
                    foreach($orders as $order)
                    {
                        $orderDetail = $this->orderDetailModel->getby([
                            'id_order'  =>  $order['id']
                        ]);
                        $order['orderDetail']   =   $orderDetail;
                        $json[] =   $order;
                    }
                }
                
                echo json_encode($json);
            }
            else
            {
                $olduri = $_SESSION['olduri'];
                return header("location: $olduri");
            }
            

        }
    }
 ?>