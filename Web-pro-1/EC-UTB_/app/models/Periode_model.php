<?php

class Periode_model {
    private $table = 'periode';
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getActivePeriode()
    {
        $this->db->query("SELECT * FROM " . $this->table . " WHERE is_active = 1 LIMIT 1");
        return $this->db->single();
    }
    
    public function getAllPeriode()
    {
        $this->db->query("SELECT * FROM " . $this->table . " ORDER BY id_periode DESC");
        return $this->db->resultSet();
    }
}