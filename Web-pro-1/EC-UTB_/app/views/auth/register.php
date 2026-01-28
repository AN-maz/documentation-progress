<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - English Club UTB</title>
    <link href="<?= BASEURL; ?>/css/output.css" rel="stylesheet">
    <script src="<?= BASEURL; ?>/js/config.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }


        .reveal-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }


        .reveal-up.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>

<body class="bg-gray-50">

    <div class="min-h-screen flex flex-col lg:flex-row">

        <div class="w-full lg:w-1/2 bg-ec-blue flex items-center justify-center relative overflow-hidden py-12 lg:py-0">
            <div class="absolute top-0 right-0 w-96 h-96 bg-ec-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>

            <div class="relative z-10 text-center px-6 lg:px-12 reveal-up">
                <img src="<?= BASEURL; ?>/images/nav-logo_p.png" alt="EC Logo" class="w-32 lg:w-40 mx-auto mb-6 lg:mb-8">
                <h2 class="text-2xl lg:text-4xl font-extrabold text-white mb-3 lg:mb-4">Join the Family!</h2>
                <p class="text-blue-200 text-sm lg:text-lg leading-relaxed max-w-md mx-auto mb-4 lg:mb-0">
                    Be part of a community that grows together. <br>
                    Prepare yourself for an exciting journey of leadership and language.
                </p>

                <div class="reveal-up mt-6 lg:mt-8 text-left inline-block space-y-2 lg:space-y-3 bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/10">
                    <div class="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
                        <span class="text-green-400">✓</span> <span>Public Speaking Training</span>
                    </div>
                    <div class="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
                        <span class="text-green-400">✓</span> <span>Toefl Preparation</span>
                    </div>
                    <div class="flex items-center text-white space-x-2 lg:space-x-3 text-sm lg:text-base">
                        <span class="text-green-400">✓</span> <span>Networking</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="reveal-up w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 lg:p-8 bg-white">
            <div class="reveal-up w-full max-w-lg py-6 lg:py-8">

                <div class="reveal-up text-center lg:text-left mb-8">
                    <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p class="mt-2 text-gray-500">Fill in your data correctly to join us.</p>
                </div>

                <div class="my-4">
                    <?php Flasher::flash(); ?>
                </div>

                <form class="space-y-5" action="<?= BASEURL; ?>/auth/processRegister" method="POST">

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="nama" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                            placeholder="e.g. Purwa Muslim">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-up">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">NIM</label>
                            <input type="text" name="nim" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                                placeholder="2455xxxx">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 reveal-up">Major (Jurusan)</label>
                            <select name="jurusan" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors bg-white">
                                <option value="" disabled selected>Select Major</option>
                                <option value="Informatics Engineering">Informatics Engineering</option>
                                <option value="Industrial Engineering">Industrial Engineering</option>
                                <option value="Visual Communication Design">Visual Communication Design</option>
                                <option value="Digital Business">Digital Business</option>
                                <option value="Retail Management">Retail Management</option>

                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                            placeholder="purwa@gmail.com">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" name="password" required minlength="6"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                            placeholder="Min. 6 characters">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Reason to Join</label>
                        <textarea name="alasan" rows="3" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue transition-colors"
                            placeholder="Why do you want to join English Club?"></textarea>
                    </div>

                    <div class="pt-2 reveal-up">
                        <button type="submit"
                            class="w-full py-3 px-4 bg-ec-red text-white font-bold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Register Now
                        </button>
                    </div>

                    <div class="text-center mt-4 reveal-up">
                        <p class="text-sm text-gray-600">
                            Already have an account?
                            <a href="<?= BASEURL; ?>/auth" class="font-bold text-ec-blue hover:text-blue-900 transition-colors">
                                Login Here
                            </a>
                        </p>
                    </div>

                    <div class="mt-6 pt-6 border-t border-gray-200 reveal-up">
                        <a href="<?= BASEURL; ?>/home" class="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Kembali ke Home
                        </a>
                    </div>

                </form>
            </div>
        </div>
    </div>

    <script src="<?= BASEURL; ?>/js/animations.js"></script>
</body>

</html>