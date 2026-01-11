<?php
class IdGenerator
{
    /**
     * Generate a new patterned ID.
     *
     * @param Database $db      Instance of Database class
     * @param string   $table   Table name (alphanumeric + underscore)
     * @param string   $column  Column name that stores the ID
     * @param string   $prefix  Prefix string (required)
     * @param int      $pad     Number of digits to pad numeric suffix (default 3)
     * @param string   $sep     Separator between prefix and number (default '-')
     *
     * @return array ['success' => bool, 'id' => string|null, 'message' => string|null]
     */
    public static function generateId($db, $table, $column, $prefix, $pad = 3, $sep = '-')
    {
        // Basic validation
        if (!is_string($prefix) || trim($prefix) === '') {
            return ['success' => false, 'id' => null, 'message' => 'Prefix tidak boleh kosong.'];
        }

        // Validate table/column names (simple whitelist-ish: only letters, numbers, underscore)
        if (!preg_match('/^[A-Za-z0-9_]+$/', $table)) {
            return ['success' => false, 'id' => null, 'message' => 'Nama tabel tidak valid.'];
        }
        if (!preg_match('/^[A-Za-z0-9_]+$/', $column)) {
            return ['success' => false, 'id' => null, 'message' => 'Nama kolom tidak valid.'];
        }

        // Clamp pad
        $pad = max(1, (int)$pad);

        // Prepare LIKE pattern for rows that start with prefix+sep
        $likePrefix = $prefix . $sep . '%';

        // Query: get the highest numeric suffix by casting the substring after the separator to UNSIGNED
        // We order by that numeric value DESC and take LIMIT 1 for efficiency
        $sql = "SELECT CAST(SUBSTRING_INDEX($column, :sep, -1) AS UNSIGNED) AS num 
                FROM $table 
                WHERE $column LIKE :likePrefix 
                ORDER BY num DESC 
                LIMIT 1";

        try {
            $db->query($sql);
            $db->bind('sep', $sep);
            $db->bind('likePrefix', $likePrefix);
            $row = $db->single();

            $maxNum = 0;
            if ($row && isset($row['num'])) {
                $maxNum = (int)$row['num'];
            }

            $nextNum = $maxNum + 1;

            // Build candidate id
            $candidate = $prefix . $sep . str_pad($nextNum, $pad, '0', STR_PAD_LEFT);

            // Safety check: ensure candidate does not already exist (race-condition safety)
            // Try a few increments if needed (max 5 attempts)
            $attempts = 0;
            while ($attempts < 5) {
                $checkSql = "SELECT 1 FROM $table WHERE $column = :candidate LIMIT 1";
                $db->query($checkSql);
                $db->bind('candidate', $candidate);
                $exists = $db->single();
                if (!$exists) {
                    return ['success' => true, 'id' => $candidate, 'message' => null];
                }
                // Increment
                $nextNum++;
                $candidate = $prefix . $sep . str_pad($nextNum, $pad, '0', STR_PAD_LEFT);
                $attempts++;
            }

            return ['success' => false, 'id' => null, 'message' => 'Gagal menghasilkan ID unik setelah beberapa percobaan. Coba lagi.'];
        } catch (Exception $e) {
            return ['success' => false, 'id' => null, 'message' => 'Database error: ' . $e->getMessage()];
        }
    }
}
