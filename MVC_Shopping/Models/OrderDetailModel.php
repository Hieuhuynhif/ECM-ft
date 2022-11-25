<?php
class OrderDetailModel extends BaseModel
{
    const TABLE = 'detail_order';

    public function getby($getByDetailOrder)
    {
        return $this->basegetby(self::TABLE, $getByDetailOrder);
    }
    public function insert($insertDetailOrder)
    {
        return $this->baseinsert(self::TABLE, $insertDetailOrder);
    }

}
?>