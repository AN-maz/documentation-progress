<?php

class DashboardApi extends ApiController
{

    public function stats($p1 = '', $p2 = '')
    {

        $jurusan = trim($p1 . ' ' . $p2);
        
        if (empty($jurusan)) {
            $jurusan = 'All';
        }

        $stats = $this->model('User_model')->getStatsByJurusan($jurusan);
        $this->response($stats, "Data untuk " . $jurusan);
    }
}
