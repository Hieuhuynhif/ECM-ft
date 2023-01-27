<?php
    class ProductModel extends BaseModel
    {
        const TABLE = 'products';
        public function getall($orderBys = [], $limit = 15 )
        {
            return $this->basegetall(self::TABLE, $orderBys, $limit);
        }
        public function getby($getByProduct)
        {
            return $this->basegetby(self::TABLE, $getByProduct);
        }
        public function getlike($getLikeProduct)
        {
            return $this->basegetlike(self::TABLE, $getLikeProduct);
        }
        public function insert($insertProduct)
        {
            return $this->baseinsert(self::TABLE, $insertProduct);
        }
        public function update($updateProduct)
        {
            return $this->baseupdate(self::TABLE, $updateProduct);
        }
        public function delete($deleteProduct)
        {
            return $this->basedelete(self::TABLE, $deleteProduct);
        }

    }
?>