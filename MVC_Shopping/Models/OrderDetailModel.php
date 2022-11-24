<?php
class OrderDetailModel extends BaseModel
{
    const TABLE = 'detail_order';
    public function insert($insertDetailOrder)
    {
        return $this->baseinsert(self::TABLE, $insertDetailOrder);
    }

}
?>