<?php

class DashboardApi extends ApiController
{
    public function stats()
    {
    
        header('Content-Type: application/json');

        try {
            $jurusan = $_GET['jurusan'] ?? 'All';
            $angkatan = $_GET['angkatan'] ?? 'All';

            $stats = $this->model('User_model')->getStatsFiltered($jurusan, $angkatan);

            if (!$stats) $stats = [];

            echo json_encode(['data' => $stats]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage(), 'data' => []]);
        }
    }

    public function export()
    {
        header('Content-Type: application/json');

        try {
            $jurusan = $_GET['jurusan'] ?? 'All';
            $angkatan = $_GET['angkatan'] ?? 'All';

            $exportData = $this->model('User_model')->getExportDataFiltered($jurusan, $angkatan);

            if (!$exportData) $exportData = [];

            echo json_encode(['data' => $exportData]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage(), 'data' => []]);
        }
    }
}