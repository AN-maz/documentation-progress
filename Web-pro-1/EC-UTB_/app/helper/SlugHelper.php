<?php

function generateSlug($text)
{
    $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');

    return $text;
}
