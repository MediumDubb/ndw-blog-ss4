<?php

namespace SilverStripe\AssetAdmin\GraphQL;

use SilverStripe\Dev\Deprecation;
use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\TypeCreator;
use GraphQL\Type\Definition\ResolveInfo;
use Exception;

if (!class_exists(TypeCreator::class)) {
    return;
}

/**
 * @deprecated 1.8.0 Use the latest version of graphql instead
 */
class PublicationNoticeType extends TypeCreator
{
    /**
     * @return array
     */
    public function __construct(Manager $manager = null)
    {
        Deprecation::notice('1.8.0', 'Use the latest version of graphql instead', Deprecation::SCOPE_CLASS);
        parent::__construct($manager);
    }

    public function attributes()
    {
        return [
            'name' => 'PublicationNotice',
            'description' => 'Describes an error that occurred on a failed publication operation',
        ];
    }

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'noticeType' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The type of notice',
            ],
            'message' => [
                'type' => Type::string(),
                'description' => 'Relevant information pertaining to the error',
            ],
            'ids' => [
                'type' => Type::listOf(Type::id()),
                'description' => 'Relevant record IDs',
            ],
        ];
    }

    /**
     * @param OperationException $value
     * @param array $args
     * @param array $context
     * @param ResolveInfo $info
     * @return mixed
     * @throws Exception
     */
    public function resolveField($value, $args, $context, ResolveInfo $info)
    {
        $fieldName = $info->fieldName;
        $method = 'get'.$fieldName;
        if (method_exists($value, $method)) {
            return $value->$method();
        }

        throw new Exception(sprintf(
            'Invalid field %s on %s',
            $fieldName,
            get_class($value)
        ));
    }
}
