<!DOCTYPE html>
<html lang="en">
<head>
    <% base_tag %>
    <title>
        <% if $PageTitle %> $SiteConfig.Title - $PageTitle <% else %> $SiteConfig.Title - $Title <% end_if %>
    </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    $MetaTags
    <% if $SiteConfig.Favicon %>
        <link rel="icon" href="{$SiteConfig.Favicon.Link}" />
    <% end_if %>
    <script src="https://kit.fontawesome.com/cd4cd83a09.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<% include Header %>
<body class="text-primary">
<main role="main">
    $Layout
</main>
<% include Footer %>
</body>
</html>
