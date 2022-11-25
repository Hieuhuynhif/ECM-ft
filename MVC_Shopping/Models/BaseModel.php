<?php
    class BaseModel extends Database
    {
        protected $connect;

        public function __construct()
        {
        }

        public function _query($sql)
        {
            $this->connect = $this->connect();
            return mysqli_query($this->connect, $sql);
        }
        public function basegetall($table, $select = ['*'], $orderBys = [], $limit = 15)
        {
            $columns = implode(',', $select);
            $orderByString = implode(' ', $orderBys);
            if($orderByString)
            {
                $sql = "SELECT ${columns} FROM ${table} WHERE status = '1' ORDER BY ${orderByString} LIMIT ${limit} ";
            }else{
                $sql = "SELECT ${columns} FROM ${table} WHERE status = '1' LIMIT ${limit} ";
            }
            
            $query = $this->_query($sql);
            $data = [];
            while($row = mysqli_fetch_assoc($query))
            {
                array_push($data, $row);
            }
            $this->close($this->connect);
            return $data;
        }
        
        public function basegetby($table, $key = []) 
        {
            $sql = "SELECT * FROM ${table} WHERE ";
            $where = [];
            foreach($key as $key =>$value)
            {
                    array_push($where,"${key} = '${value}' ");
            }
            $sql .= implode('AND ',$where);
            $sql .= "; ";
            $query = $this->_query($sql);
            $data = [];
            while($row = mysqli_fetch_assoc($query))
            {
                array_push($data, $row);
            }
            $this->close($this->connect);
            return $data;
        }
        public function basegetlike($table, $key = []) 
        {
            $sql = "SELECT * FROM ${table} WHERE ";
            $where = [];
            foreach($key as $key =>$value)
            {
                    array_push($where,"${key} LIKE '%${value}%' ");
            }
            $sql .= implode('AND ',$where);
            $sql .= "; ";
            $query = $this->_query($sql);
            $data = [];
            while($row = mysqli_fetch_assoc($query))
            {
                array_push($data, $row);
            }
            $this->close($this->connect);
            return $data;
        }
        
        public function baseinsert($table, $insert = [])
        {
            foreach($insert as $key => $value)
            {
                $keys[] = $key;
                $values[] = $value; 
            }
            $keys = implode(' , ', $keys) ;
            $values= "'" . implode("' , '", $values) . "'";
            $sql = "INSERT INTO ${table} (${keys}) VALUES (${values}) ; ";
            $this->_query($sql);
            $this->close($this->connect);
        }
        
        public function baseupdate($table, $update = [])
        {
            foreach($update as $key => $value)
            {
                if($key == "username" || $key == "name")
                {
                    $where = "${key} = '${value}'";
                }
                else
                {
                    $updates[] = "${key} = '${value}'";
                }
            }

            $updates = implode(',', $updates);
            $sql = "UPDATE ${table}
                    SET ${updates} WHERE ${where} ;";
            $this->_query($sql);
            $this->close($this->connect);
        }
        
        public function basedelete($table, $delete = [])
        {
            foreach($delete as $key => $value)
            {
                $deletes[] = "${key} = '${value}'";
            }
            $deletes = implode(',', $deletes);
            $sql = "DELETE FROM ${table}
                    WHERE ${deletes}";
            $this->_query($sql);
            $this->close($this->connect);
        }
    }
?>