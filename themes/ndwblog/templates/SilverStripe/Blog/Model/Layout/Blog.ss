<% require css('silverstripe/blog: client/dist/styles/main.css') %>

<div class="blog blog-entry container bg-white" aria-label="blog page">
    <div class="content-padding" id="contentBox">
        <div class="content-box">
            <article>
                <%-- Content above blog posts/ below Banner --%>
                $Content

                <%-- Decide what content is displayed --%>
                <% if $PaginatedList.Exists %>
                    <div class="row">
                        <% loop $PaginatedList %>
                            <% include SilverStripe\Blog\Model\Includes\PostSummary %>
                        <% end_loop %>
                    </div>
                <% else %>
                    <p><%t SilverStripe\\Blog\\Model\\Blog.NoPosts 'There are no posts' %></p>
                <% end_if %>

            </article>

            $Form
            $CommentsForm

            <%-- Decide what pagination to show --%>
            <% if $TagPaginatedList %>
                <% with $TagPaginatedList %>
                    <% if $MoreThanOnePage %>
                        <div class="pb-6">
                            <% include SilverStripe\Blog\Model\Includes\Pagination %>
                        </div>
                    <% end_if %>
                <% end_with %>
            <% else %>
                <% with $PaginatedList %>
                    <% if $MoreThanOnePage %>
                        <div class="pb-6">
                            <% include SilverStripe\Blog\Model\Includes\Pagination %>
                        </div>
                    <% end_if %>
                <% end_with %>
            <% end_if %>

        </div>
    </div>
</div>

<% include SilverStripe\\Blog\\BlogSideBar %>
