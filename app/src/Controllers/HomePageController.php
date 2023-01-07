<?php
namespace NDWCodes\NDWBlog\Controllers;

use PageController;
use SilverStripe\View\Requirements;

class HomePageController extends PageController
{
    private static $allowed_actions = [

    ];

    public function init() {
        parent::init();

        Requirements::themedJavascript('/vendor/phaser.min');
        Requirements::themedJavascript('/game_classes/index');
        Requirements::themedJavascript('/game_classes/settings');
        Requirements::themedJavascript('/game_classes/circuit');
        Requirements::themedJavascript('/game_classes/camera');


    }
}
