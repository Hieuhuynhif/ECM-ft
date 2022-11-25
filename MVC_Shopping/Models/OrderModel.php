<?php
class OrderModel extends BaseModel
{
    const TABLE = 'orders';

    public function getby($getByOrder)
    {
        return $this->basegetby(self::TABLE, $getByOrder);
    }
    public function insert($insertOrder)
    {
        return $this->baseinsert(self::TABLE, $insertOrder);
    }
}
?>