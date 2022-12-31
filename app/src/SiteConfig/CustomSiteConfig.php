<?php
namespace NDWCodes\NDWBlog\SiteConfig;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;

class CustomSiteConfig extends DataExtension
{
    private static $db = [
        'GoogleAnalyticsID'         => 'Varchar(255)',
        'FooterContent'             => 'HTMLText',

        'ContactFormMessage'        => 'Varchar(250)',
        'ContactFormRecipients'     => 'Text',
    ];
    private static $has_one =[
        'Favicon'                   => Image::class,
        'Logo'                      => Image::class,
    ];
    private static $owns = [
        'Favicon',
        'Logo'
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab(
            "Root.Main",
            [
                UploadField::create('Logo')
                    ->setFolderName('Logos'),
                UploadField::create("Favicon", "Favicon")
                    ->setFolderName("Favicons"),
                TextField::create('GoogleAnalyticsID', 'Google Analytics ID'),
            ]
        );

        return $fields;
    }
}
