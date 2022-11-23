<?php
    class BaseController
    {
        function __construct()
        {
            
        }
        const VIEW_FOLDER_NAME = 'Views';
        const MODEL_FOLDER_NAME = 'Models';
        protected function view($viewPath, array $data = [])
        {   
            foreach($data as $key => $item)
            {
                $$key = $item;
            }
            return require (self::VIEW_FOLDER_NAME.'/'.str_replace('.','/',$viewPath).'.php');
        }
        protected function loadModel($modelPath)
        {
            return require (self::MODEL_FOLDER_NAME.'/'.$modelPath.'.php');
        }
    }
?>