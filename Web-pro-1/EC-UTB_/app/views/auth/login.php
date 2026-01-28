<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - English Club UTB</title>
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
            <div class="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-ec-red/20 rounded-full blur-3xl"></div>
            <div class="absolute top-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

            <div class="relative z-10 text-center px-6 lg:px-12 reveal-up">
                <img src="<?= BASEURL; ?>/images/nav-logo_p.png" alt="EC Logo" class="w-32 lg:w-48 mx-auto mb-6 lg:mb-8">
                <h2 class="text-2xl lg:text-4xl font-extrabold text-white mb-3 lg:mb-4">Welcome Back!</h2>
                <p class="text-blue-200 text-base lg:text-lg leading-relaxed">
                    "The limits of my language mean the limits of my world." <br> Let's continue your journey with us.
                </p>
            </div>
        </div>

        <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-white reveal-up">
            <div class="w-full max-w-md space-y-8">

                <div class="text-center lg:text-left reveal-up">
                    <h2 class="text-3xl font-bold text-gray-900">Sign In</h2>
                    <p class="mt-2 text-gray-500">Please enter your details to access your account.</p>
                </div>

                <div class="my-4">
                    <?php Flasher::flash(); ?>
                </div>


                <form class="mt-8 space-y-6" action="<?= BASEURL; ?>/auth/login" method="POST">

                    <div class="space-y-5 reveal-up">
                        <div >
                            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                            <input id="email" name="email" type="email" required
                                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ec-blue focus:border-transparent transition duration-200">
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input id="password" name="password" type="password" required
                                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ec-blue focus:border-transparent transition duration-200">
                        </div>
                    </div>

                    <div class="flex items-center reveal-up">
                        <input type="checkbox" name="remember" id="remember" class="w-4 h-4 rounded border-gray-300 focus:ring-ec-blue">
                        <label for="remember" class="ml-2 text-sm text-gray-700">Remember Me</label>
                    </div>

                    <div>
                        <button type="submit" class="w-full py-3 bg-ec-blue text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign In</button>
                    </div>

                </form>

                <p class="text-sm text-gray-600 reveal-up">
                    Don't have an account?
                    <a href="<?= BASEURL; ?>/auth/register" class="font-bold text-ec-red hover:text-red-700 transition-colors">
                        Register Here
                    </a>
                </p>

                <div class="mt-6 pt-6 border-t border-gray-200 reveal-up">
                    <a href="<?= BASEURL; ?>/home" class="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Kembali ke Home
                    </a>
                </div>

            </div>
        </div>
    </div>

    <script src="<?= BASEURL; ?>/js/animations.js"></script>
</body>

</html>