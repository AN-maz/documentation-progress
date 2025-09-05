<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Web Desain',
            'slug' => 'web-desain'
        ]);

        Category::create([
            'name' => 'Mechine Learning',
            'slug' => 'mechine-learnig'
        ]);

        Category::create([
            'name' => 'Cyber Security',
            'slug' => 'cyber-security'
        ]);

        Category::create([
            'name' => 'UI UX',
            'slug' => 'ui-ux'
        ]);

        Category::create([
            'name' => 'Data Structure',
            'slug' => 'data-structure'
        ]);
    }
}
