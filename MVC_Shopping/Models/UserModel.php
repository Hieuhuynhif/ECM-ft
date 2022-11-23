<?php
class UserModel extends BaseModel
{
    const TABLE = 'user';
    public function getby($key)
    {
        return $this->basegetby(self::TABLE, $key);
    }
    public function getlike($key)
    {
        return $this->basegetlike(self::TABLE, $key);
    }
    public function insert($insertUser)
    {
        $this->baseinsert(self::TABLE, $insertUser);
    }
    public function update($updateUser)
    {
        $this->baseupdate(self::TABLE, $updateUser);

    }
    public function delete($deleteUser)
    {
        $this->basedelete(self::TABLE, $deleteUser);

    }
}
?>