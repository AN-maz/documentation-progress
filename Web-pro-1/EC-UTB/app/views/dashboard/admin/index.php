<body class="bg-gray-50">

    <!-- Include Modern Mobile Navbar -->
    <?php require_once '../app/views/templates/tempDashAdmin/mobileNav.php'; ?>

    <div class="flex min-h-screen pt-0">

        <?php require_once '../app/views/templates/tempDashAdmin/sidebar.php'; ?>

        <!-- Main Content -->
        <main class="flex-1 p-6 lg:p-8 md:pl-24 lg:pl-64">
            <div class="max-w-7xl mx-auto">

                <!-- Welcome Card -->
                <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
                    <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Selamat Datang, Admin!
                    </h1>
                    <p class="text-gray-600">Kelola website English Club UTB dari sini</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Total News</p>
                                <p class="text-3xl font-bold text-gray-900 mt-2"><?= count($data['news']); ?></p>
                            </div>
                            <div class="bg-blue-100 p-3 rounded-lg">
                                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Total Users</p>
                                <p class="text-3xl font-bold text-gray-900 mt-2"><?= count($data['users']); ?></p>
                            </div>
                            <div class="bg-green-100 p-3 rounded-lg">
                                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Pending Approval</p>
                                <?php
                                $pending = array_filter($data['users'], function ($u) {
                                    return $u['is_approved'] == 0;
                                });
                                ?>
                                <p class="text-3xl font-bold text-gray-900 mt-2"><?= count($pending); ?></p>
                            </div>
                            <div class="bg-yellow-100 p-3 rounded-lg">
                                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chart Section -->
                <div class="bg-white p-6 rounded-xl shadow-lg mt-6">
                    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 class="text-xl font-bold text-gray-800">Visualisasi Data Anggota</h3>

                        <select id="filterJurusan" class="w-full md:w-64 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                            <option value="All">Semua Jurusan</option>
                            <option value="Informatics_Engineering">Informatics Engineering</option>
                            <option value="Industrial_Engineering">Industrial Engineering</option>
                            <option value="Visual_Communication_Design">Visual Communication Design</option>
                            <option value="Digital_Business">Digital Business</option>
                            <option value="Retail_Management">Retail Management</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Bar Chart -->
                        <div class="relative h-[400px]">
                            <canvas id="userChart"></canvas>
                        </div>

                        <!-- Pie Chart -->
                        <div class="relative h-[400px] flex items-center justify-center">
                            <canvas id="userPieChart"></canvas>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        window.base_url = "<?= BASEURL; ?>";
    </script>
    <script src="<?= BASEURL; ?>/js/dashboard-charts.js"></script>

</body>

</html>
