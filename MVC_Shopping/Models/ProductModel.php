<?php
    class ProductModel extends BaseModel
    {
        const TABLE = 'products';
        public function getall($select =['*'], $orderBys = [], $limit = 15 )
        {
            return $this->basegetall(self::TABLE, $select, $orderBys, $limit);
        }
        public function getby($key)
        {
            return $this->basegetby(self::TABLE, $key);
        }
        public function getlike($key)
        {
            return $this->basegetlike(self::TABLE, $key);
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