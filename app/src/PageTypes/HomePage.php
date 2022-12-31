<?php


namespace NDWCodes\NDWBlog\PageTypes;


use NDWCodes\NDWBlog\Controllers\HomePageController;
use Page;

class HomePage extends Page
{

    private static $singular_name = 'Home Page';
    private static $plural_name = 'Home Pages';
    private static $table_name = 'HomePage';
    private static $description = 'Displays the home page content.';
    private static $controller_name = HomePageController::class;

    private static $db = [
    ];

    private static $has_one = [

    ];

    private static $has_many = [

    ];

    private static $owns = [

    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldsToTab(
            "Root.Main",
            [

            ]
        );

        return $fields;
    }
}
