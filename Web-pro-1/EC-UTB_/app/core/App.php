<?php

class App
{
    protected $controller = 'Home';
    protected $method = 'index';
    protected $params = [];

    public function __construct()
    {
        $url = $this->parseURL();

        $controllerPath = '../app/controllers/';
        $adminFolders = ['api', 'super', 'edu', 'sdm'];

        if (isset($url[0]) && in_array($url[0], $adminFolders)) {

            if (isset($url[1]) && file_exists('../app/controllers/' . $url[0] . '/' . ucfirst($url[1]) . '.php')) {
                $this->controller = ucfirst($url[1]);
                $controllerPath = '../app/controllers/' . $url[0] . '/';
                unset($url[0], $url[1]);
            } elseif (file_exists('../app/controllers/' . $url[0] . '/Dashboard.php')) {
                $this->controller = 'Dashboard';
                $controllerPath = '../app/controllers/' . $url[0] . '/';
                unset($url[0]);
            }
        } elseif (isset($url[0]) && file_exists('../app/controllers/' . ucfirst($url[0]) . '.php')) {
            $this->controller = ucfirst($url[0]);
            unset($url[0]);
        }

        require_once $controllerPath . $this->controller . '.php';
        $this->controller = new $this->controller;

        $url = array_values($url);
        
        if (isset($url[0])) {
            if (method_exists($this->controller, $url[0])) {
                $this->method = $url[0];
                unset($url[0]);
            }
        }

        // Params
        if (!empty($url)) {
            $this->params = array_values($url);
        }

        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseURL()
    {
        if (isset($_SERVER['REQUEST_URI'])) {
            $uri = $_SERVER['REQUEST_URI'];
            $basePath = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
            $path = str_replace($basePath, '', $uri);
            $path = parse_url($path, PHP_URL_PATH);
            $path = trim($path, '/');
            return explode('/', $path);
        }
        return [];
    }
}
