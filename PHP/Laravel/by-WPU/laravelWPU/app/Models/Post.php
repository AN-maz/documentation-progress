<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Post extends Model
{

    // Metode Mass Assignment

    protected $fillable = ['title','author','slug','body']; 

    // buka terminal dan ketik: php artisan tinker
    
}
