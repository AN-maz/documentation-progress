<?php

class About extends Controller
{
    private $divisions = [
        'top-management' => [
            'name' => 'Top Management',
            'desc' => 'The core decision makers and strategic leaders of the organization.',
            'group_photo' => 'TopMan/FullTopMan.png',
            'folder' => 'TopMan',
            'proker' => ['Annual Work Meeting', 'Mid-Year Evaluation', 'Strategic Planning'],
            'members' => [
                ['name' => 'Dhenia Putri Nuraini', 'role' => 'President', 'major' => 'Informatics Engineering', 'img' => 'Dhenia-Putri-Nuraini.JPG'],
                ['name' => 'Muhammad Arfana Firjatullah', 'role' => 'Vice President', 'major' => 'Informatics Engineering', 'img' => 'Muhammad-Arfana-Firjatullah.JPG'],
                ['name' => 'Anisa Febrianti', 'role' => 'Treasurer', 'major' => 'Information Systems', 'img' => 'Anisa Febrianti.JPG'],
                ['name' => 'Nabilah', 'role' => 'Secretary', 'major' => 'Management', 'img' => 'Nabilah - Secretary 4.JPG']
            ]
        ],
        'pendidikan' => [
            'name' => 'Education Division',
            'desc' => 'Focusing on developing English language skills for all members through structured learning programs.',
            'group_photo' => 'pendidikan/fullPendidikan.png',
            'folder' => 'pendidikan',
            'proker' => ['Weekly TOEFL Class', 'Public Speaking Workshop', 'English Conversation Club', 'Grammar Intensive Course'],
            'members' => [
                ['name' => 'As\'ad M. H.', 'role' => 'Head of Division', 'major' => 'Informatics Engineering', 'img' => 'As\'ad M. H. - Pendidikan 2.JPG'],
                ['name' => 'Ega Silfhia', 'role' => 'Staff', 'major' => 'Informatics Engineering', 'img' => 'Ega Silfhia - Pendidikan - 2.jpg'],
                ['name' => 'Mutia Putri Pramesti', 'role' => 'Staff', 'major' => 'Industrial Engineering', 'img' => 'MUTIA PUTRI PRAMESTI.HEIC'],
                ['name' => 'Dwi Budi', 'role' => 'Staff', 'major' => 'Informatics Engineering', 'img' => 'Ega Silfhia - Pendidikan - 2.jpg'],
            ]
        ],
        'humas' => [
            'name' => 'Public Relations Division',
            'desc' => 'Managing external communications, partnerships, and maintaining the organization\'s public image.',
            'group_photo' => 'humas/fullHumas.png',
            'folder' => 'humas',
            'proker' => ['Partnership Development', 'Media Relations', 'Event Promotion', 'Social Media Management'],
            'members' => [
                ['name' => 'M. Sultan', 'role' => 'Head of Division', 'major' => 'Informatics Engineering', 'img' => 'M.Sultan.png'],
                ['name' => 'Daffa Saputra', 'role' => 'Staff', 'major' => 'Industrial Engineering', 'img' => 'daffa-saputra.png'],
                ['name' => 'Andrian Maulana Dzikwan', 'role' => 'Staff', 'major' => 'Informatics Engineering', 'img' => 'andrian-maulana.png']
            ]
        ],
        'kewirus' => [
            'name' => 'Finance Division',
            'desc' => 'Managing the organization\'s financial resources, budgeting, and financial reporting.',
            'group_photo' => 'kewirus/adrian.png',
            'folder' => 'kewirus',
            'proker' => ['Budget Planning', 'Financial Reporting', 'Fund Management', 'Expense Tracking'],
            'members' => [
                ['name' => 'Adrian', 'role' => 'Head of Division', 'major' => 'Informatics Engineering', 'img' => 'adrian.png']
            ]
        ],
        'pubdok' => [
            'name' => 'Publication & Documentation Division',
            'desc' => 'Handling documentation, content creation, and maintaining organizational records.',
            'group_photo' => 'pubdok/fullPubdok.png',
            'folder' => 'pubdok',
            'proker' => ['Event Documentation', 'Content Creation', 'Newsletter Publication', 'Archive Management'],
            'members' => [
                ['name' => 'M. Belga Ghifari', 'role' => 'Head of Division', 'major' => 'Informatics Engineering', 'img' => 'M. BELGA GHIFARI.png'],
                ['name' => 'Muhammad Arga', 'role' => 'Staff', 'major' => 'Informatics Engineering', 'img' => 'muhammad-arga.png']
            ]
        ],
        'sdm' => [
            'name' => 'Human Resources Division',
            'desc' => 'Managing member recruitment, development, and maintaining organizational culture.',
            'group_photo' => 'SDM/FullSDM.png',
            'folder' => 'SDM',
            'proker' => ['Member Recruitment', 'Training & Development', 'Performance Evaluation', 'Team Building'],
            'members' => [
                ['name' => 'Adrian Fathurrahman', 'role' => 'Head of Division', 'major' => 'Informatics Engineering', 'img' => 'Adrian Fathurrahman_4.JPG'],
                ['name' => 'M. Fachri Athallah', 'role' => 'Staff', 'major' => 'Informatics Engineering', 'img' => 'M. Fachri Athallah .png']
            ]
        ]
    ];

    public function index()
    {


        $data['judul'] = 'About';
        $this->view('templates/header', $data);
        $this->view('about/index');
        $this->view('templates/footer');
    }
    public function page() {}

    public function division($slug = null)
    {
        // Cek apakah divisi ada di data array kita
        if (!isset($this->divisions[$slug])) {
            // Kalau tidak ada, kembalikan ke index about atau tampilkan error
            header('Location: ' . BASEURL . '/about');
            exit;
        }

        $data['division'] = $this->divisions[$slug];
        $data['judul'] = $data['division']['name'];

        $this->view('templates/header', $data);
        $this->view('about/detail', $data); // File view baru untuk detail
        $this->view('templates/footer');
    }
}
